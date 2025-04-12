
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { 
  Camera,
  Receipt, 
  Upload, 
  UserPlus, 
  Check, 
  File, 
  Loader2,
  DollarSign,
  SendHorizontal
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Person {
  id: string;
  name: string;
  email?: string;
  color: string;
  image?: string;
  total: number;
}

interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  assignedTo: string | null;
}

const colorOptions = [
  "bg-blue-100 border-blue-300",
  "bg-green-100 border-green-300",
  "bg-amber-100 border-amber-300",
  "bg-pink-100 border-pink-300",
  "bg-purple-100 border-purple-300",
  "bg-cyan-100 border-cyan-300",
];

const BillSplit = () => {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "processing" | "done">("idle");
  const [people, setPeople] = useState<Person[]>([
    { 
      id: "user", 
      name: "You", 
      color: "bg-money-blue/10 border-money-blue/30", 
      image: undefined,
      total: 0 
    },
    { 
      id: "p1", 
      name: "Alex", 
      color: colorOptions[0], 
      image: undefined,
      total: 0 
    },
    { 
      id: "p2", 
      name: "Taylor", 
      color: colorOptions[1], 
      image: undefined,
      total: 0 
    },
  ]);
  
  const [newPersonName, setNewPersonName] = useState("");
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [totalBill, setTotalBill] = useState(0);

  // This would use actual file upload and OCR in a real implementation
  const handleUpload = (isCamera = false) => {
    setUploadState("uploading");
    
    setTimeout(() => {
      setUploadState("processing");
      
      setTimeout(() => {
        // Sample receipt items from OCR
        const sampleItems: ReceiptItem[] = [
          { id: "i1", name: "Margherita Pizza", price: 12.99, assignedTo: null },
          { id: "i2", name: "Pepperoni Pizza", price: 14.99, assignedTo: null },
          { id: "i3", name: "Buffalo Wings", price: 9.99, assignedTo: null },
          { id: "i4", name: "Caesar Salad", price: 7.99, assignedTo: null },
          { id: "i5", name: "Garlic Bread", price: 4.99, assignedTo: null },
          { id: "i6", name: "Soda (2)", price: 5.98, assignedTo: null },
        ];
        
        const total = sampleItems.reduce((sum, item) => sum + item.price, 0);
        
        setItems(sampleItems);
        setTotalBill(total);
        setUploadState("done");
        
        toast.success("Receipt processed successfully!", {
          description: `${sampleItems.length} items detected.`,
        });
      }, 2500);
    }, 1500);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    const personId = destination.droppableId.replace("person-", "");
    
    const updatedItems = items.map(item => {
      if (item.id === draggableId) {
        return { ...item, assignedTo: personId };
      }
      return item;
    });
    
    setItems(updatedItems);
    
    // Update totals
    const updatedPeople = people.map(person => {
      const personItems = updatedItems.filter(item => item.assignedTo === person.id);
      const total = personItems.reduce((sum, item) => sum + item.price, 0);
      return { ...person, total };
    });
    
    setPeople(updatedPeople);
  };

  const handleAddPerson = () => {
    if (!newPersonName.trim()) return;
    
    const colorIndex = people.length % colorOptions.length;
    
    const newPerson: Person = {
      id: `p${Date.now()}`,
      name: newPersonName,
      color: colorOptions[colorIndex],
      total: 0
    };
    
    setPeople([...people, newPerson]);
    setNewPersonName("");
  };

  const calculateSplitEqually = () => {
    const itemsPerPerson = Math.ceil(items.length / people.length);
    let updatedItems = [...items];
    
    // Reset all assignments
    updatedItems = updatedItems.map(item => ({ ...item, assignedTo: null }));
    
    // Distribute items evenly
    people.forEach((person, index) => {
      const startIdx = index * itemsPerPerson;
      const endIdx = Math.min(startIdx + itemsPerPerson, items.length);
      
      for (let i = startIdx; i < endIdx; i++) {
        if (i < updatedItems.length) {
          updatedItems[i].assignedTo = person.id;
        }
      }
    });
    
    setItems(updatedItems);
    
    // Update totals
    const updatedPeople = people.map(person => {
      const personItems = updatedItems.filter(item => item.assignedTo === person.id);
      const total = personItems.reduce((sum, item) => sum + item.price, 0);
      return { ...person, total };
    });
    
    setPeople(updatedPeople);
  };

  const getAssignedItemsCount = (personId: string) => {
    return items.filter(item => item.assignedTo === personId).length;
  };

  const getUnassignedItemsCount = () => {
    return items.filter(item => item.assignedTo === null).length;
  };

  const requestPayment = () => {
    toast.success("Payment requests sent successfully!", {
      description: "Your friends will receive notifications to pay their share.",
    });
  };

  return (
    <DashboardLayout title="Split Bills" subtitle="Scan and split bills with friends effortlessly">
      <div className="grid md:grid-cols-7 gap-6">
        <div className="md:col-span-4 space-y-6">
          {/* Upload section */}
          {uploadState === "idle" ? (
            <Card className="border-dashed border-2">
              <CardHeader className="text-center">
                <CardTitle>Upload Receipt</CardTitle>
                <CardDescription>
                  Upload an image or PDF of your bill to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="mb-6">
                  <Receipt className="h-16 w-16 text-gray-400" />
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => handleUpload(false)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload File
                  </Button>
                  <Button variant="outline" onClick={() => handleUpload(true)}>
                    <Camera className="mr-2 h-4 w-4" />
                    Take Photo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Bill Details</CardTitle>
                  <CardDescription>
                    {uploadState === "uploading" ? "Uploading receipt..." : 
                     uploadState === "processing" ? "Processing receipt..." : 
                     `${items.length} items detected - $${totalBill.toFixed(2)} total`}
                  </CardDescription>
                </div>
                {uploadState === "done" && (
                  <Button variant="outline" size="sm" onClick={() => setUploadState("idle")}>
                    <Upload className="mr-2 h-4 w-4" />
                    New Bill
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {uploadState === "uploading" || uploadState === "processing" ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-money-blue" />
                    <p className="text-gray-500">
                      {uploadState === "uploading" ? "Uploading receipt..." : "AI is processing your receipt..."}
                    </p>
                  </div>
                ) : (
                  <Tabs defaultValue="items">
                    <TabsList className="w-full">
                      <TabsTrigger value="items" className="flex-1">Items ({items.length})</TabsTrigger>
                      <TabsTrigger value="receipt" className="flex-1">Receipt View</TabsTrigger>
                    </TabsList>
                    <TabsContent value="items" className="py-2">
                      <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="unassigned-items">
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="space-y-2 mb-4"
                            >
                              <div className="text-sm font-medium text-gray-500 mb-2">
                                Unassigned Items ({getUnassignedItemsCount()})
                              </div>
                              {items
                                .filter(item => item.assignedTo === null)
                                .map((item, index) => (
                                  <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="bg-white border rounded-lg p-3 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
                                      >
                                        <div>{item.name}</div>
                                        <div className="font-medium">${item.price.toFixed(2)}</div>
                                      </div>
                                    )}
                                  </Draggable>
                              ))}
                              {provided.placeholder}
                              {getUnassignedItemsCount() === 0 && (
                                <div className="text-center py-2 text-gray-400 text-sm italic">
                                  All items assigned
                                </div>
                              )}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </TabsContent>
                    <TabsContent value="receipt">
                      <div className="bg-white border rounded-lg p-4 shadow-inner">
                        <div className="text-center mb-4">
                          <div className="font-bold">RECEIPT</div>
                          <div className="text-gray-500 text-sm">Pizza Palace</div>
                          <div className="text-gray-500 text-xs">04/12/2025 7:45 PM</div>
                        </div>
                        <div className="border-t border-b py-3 space-y-2">
                          {items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <div>{item.name}</div>
                              <div>${item.price.toFixed(2)}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between text-sm">
                            <div>Subtotal</div>
                            <div>${totalBill.toFixed(2)}</div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div>Tax (8.5%)</div>
                            <div>${(totalBill * 0.085).toFixed(2)}</div>
                          </div>
                          <div className="flex justify-between font-bold border-t pt-1 mt-1">
                            <div>Total</div>
                            <div>${(totalBill * 1.085).toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
              {uploadState === "done" && (
                <CardFooter className="justify-end">
                  <Button variant="outline" className="mr-2" onClick={calculateSplitEqually}>
                    Split Equally
                  </Button>
                </CardFooter>
              )}
            </Card>
          )}
        </div>
        
        <div className="md:col-span-3 space-y-6">
          {/* People section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>People</CardTitle>
                <CardDescription>Drag items to assign them to people</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Add a new person"
                  value={newPersonName}
                  onChange={(e) => setNewPersonName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddPerson();
                    }
                  }}
                />
                <Button size="icon" onClick={handleAddPerson} disabled={!newPersonName.trim()}>
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>

              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="space-y-3">
                  {people.map((person) => (
                    <Droppable key={person.id} droppableId={`person-${person.id}`}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={cn(
                            "border rounded-lg p-3 transition-all",
                            person.color,
                            person.total > 0 ? "shadow-md" : ""
                          )}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                {person.image ? (
                                  <AvatarImage src={person.image} alt={person.name} />
                                ) : (
                                  <AvatarFallback>{person.name[0]}</AvatarFallback>
                                )}
                              </Avatar>
                              <div>
                                <div className="font-medium">{person.name}</div>
                                <div className="text-xs text-gray-500">
                                  {getAssignedItemsCount(person.id)} items
                                </div>
                              </div>
                            </div>
                            <div className="font-semibold">
                              ${person.total.toFixed(2)}
                            </div>
                          </div>
                          
                          <div className="space-y-2 min-h-12">
                            {items
                              .filter(item => item.assignedTo === person.id)
                              .map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="bg-white/80 border rounded-lg p-2 flex justify-between items-center text-sm shadow-sm"
                                    >
                                      <div>{item.name}</div>
                                      <div>${item.price.toFixed(2)}</div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>
              </DragDropContext>
            </CardContent>
          </Card>
          
          {/* Payment button */}
          {uploadState === "done" && (
            <Button 
              className="w-full py-6 text-lg" 
              onClick={requestPayment}
              disabled={getUnassignedItemsCount() > 0}
            >
              <DollarSign className="mr-2 h-5 w-5" />
              Request Payments
              <SendHorizontal className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BillSplit;
