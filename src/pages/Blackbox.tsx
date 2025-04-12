
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Shield,
  Lock,
  FileKey,
  User,
  Phone,
  Copy,
  EyeOff,
  Eye,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  ChevronRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
}

interface StoredDocument {
  id: string;
  name: string;
  type: "bank" | "insurance" | "investment" | "will" | "tax" | "other";
  date: string;
  securityLevel: number;
}

const Blackbox = () => {
  const [securityScore, setSecurityScore] = useState(78);
  const [showSensitive, setShowSensitive] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 123-4567",
      relationship: "Spouse"
    },
    {
      id: "2",
      name: "Michael Smith",
      email: "msmith@example.com",
      phone: "+1 (555) 987-6543",
      relationship: "Brother"
    }
  ]);
  
  const [documents, setDocuments] = useState<StoredDocument[]>([
    {
      id: "d1",
      name: "Chase Bank Account",
      type: "bank",
      date: "2025-03-15",
      securityLevel: 3
    },
    {
      id: "d2",
      name: "State Farm Insurance",
      type: "insurance",
      date: "2025-02-28",
      securityLevel: 2
    },
    {
      id: "d3",
      name: "Vanguard Investment Portfolio",
      type: "investment",
      date: "2025-04-01",
      securityLevel: 3
    },
    {
      id: "d4",
      name: "Last Will and Testament",
      type: "will",
      date: "2024-11-10",
      securityLevel: 3
    }
  ]);

  const [newContact, setNewContact] = useState<Partial<Contact>>({
    name: "",
    email: "",
    phone: "",
    relationship: ""
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email || !newContact.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    const contact: Contact = {
      id: `c${Date.now()}`,
      name: newContact.name,
      email: newContact.email,
      phone: newContact.phone,
      relationship: newContact.relationship || "Other"
    };

    setEmergencyContacts([...emergencyContacts, contact]);
    setNewContact({ name: "", email: "", phone: "", relationship: "" });
    
    toast.success("Emergency contact added", {
      description: `${contact.name} has been added to your emergency contacts.`
    });

    // Improve security score as the user adds more contacts
    if (emergencyContacts.length < 3) {
      setSecurityScore(prev => Math.min(100, prev + 5));
    }
  };

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", { description });
  };

  const getSecurityLevelColor = (level: number) => {
    switch (level) {
      case 1: return "bg-yellow-500";
      case 2: return "bg-orange-500";
      case 3: return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getSecurityScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const maskText = (text: string) => {
    if (!showSensitive) {
      return "•".repeat(Math.min(text.length, 10));
    }
    return text;
  };

  return (
    <DashboardLayout
      title="Financial Blackbox"
      subtitle="Secure storage for your most critical financial information"
    >
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          {/* Security Score */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-money-blue" />
                Security Score
              </CardTitle>
              <CardDescription>
                Your financial blackbox security level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={cn(
                  "inline-flex rounded-full p-8 text-white font-bold text-3xl transition-all",
                  getSecurityScoreColor(securityScore)
                )}>
                  {securityScore}%
                </div>
              </div>
              <Progress 
                value={securityScore} 
                className={cn("h-2 w-full", getSecurityScoreColor(securityScore))} 
              />
              <div className="pt-2 text-sm text-gray-500">
                {securityScore >= 80 ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Your blackbox is well secured
                  </div>
                ) : (
                  <div className="flex items-center text-amber-600">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Add more security measures to improve your score
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Enhance Security
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileKey className="mr-2 h-4 w-4" />
                Add New Document
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Add Emergency Contact
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Lock className="mr-2 h-4 w-4" />
                Update Access Rules
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          {/* Main Content */}
          <Tabs defaultValue="documents">
            <TabsList className="w-full">
              <TabsTrigger value="documents" className="flex-1">
                <FileKey className="mr-2 h-4 w-4" />
                Secure Documents
              </TabsTrigger>
              <TabsTrigger value="contacts" className="flex-1">
                <Phone className="mr-2 h-4 w-4" />
                Emergency Contacts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents" className="pt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Stored Documents</CardTitle>
                    <Button 
                      size="sm"
                      onClick={() => setShowSensitive(!showSensitive)}
                      variant="ghost"
                    >
                      {showSensitive ? (
                        <EyeOff className="h-4 w-4 mr-1" />
                      ) : (
                        <Eye className="h-4 w-4 mr-1" />
                      )}
                      {showSensitive ? "Hide Details" : "Show Details"}
                    </Button>
                  </div>
                  <CardDescription>
                    These documents are securely encrypted
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div 
                        key={doc.id} 
                        className="flex items-center justify-between border p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <div 
                            className={cn(
                              "h-8 w-1 rounded-full mr-3",
                              getSecurityLevelColor(doc.securityLevel)
                            )} 
                            title={`Security Level: ${doc.securityLevel}`}
                          />
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-xs text-gray-500">
                              {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} • Added on {new Date(doc.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add New Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Secure Access Information</CardTitle>
                  <CardDescription>
                    This information will be shared with emergency contacts when needed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Emergency Access Code</div>
                    <div className="flex items-center">
                      <div className="font-mono bg-gray-100 p-2 rounded-lg flex-1">
                        {maskText("EMERG-3257-ABCD-9876")}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard("EMERG-3257-ABCD-9876", "Emergency access code copied")}
                        className="ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Your emergency contacts will need this code to access your blackbox
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-1">Recovery Instructions</div>
                    <Textarea 
                      placeholder="Add special instructions for your emergency contacts..."
                      className="h-20 resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contacts" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trusted Emergency Contacts</CardTitle>
                  <CardDescription>
                    People who can access your financial information in an emergency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emergencyContacts.map((contact) => (
                      <div 
                        key={contact.id}
                        className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-gray-500">{contact.relationship}</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                        <div className="mt-2 space-y-1 text-sm">
                          <div className="flex items-center">
                            <div className="text-gray-500 w-16">Email:</div>
                            <div className="flex-1">{contact.email}</div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard(contact.email, "Email copied")}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center">
                            <div className="text-gray-500 w-16">Phone:</div>
                            <div className="flex-1">{contact.phone}</div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard(contact.phone, "Phone number copied")}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Add New Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <Input 
                        placeholder="John Doe"
                        value={newContact.name}
                        onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input 
                          placeholder="email@example.com"
                          type="email"
                          value={newContact.email}
                          onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <Input 
                          placeholder="+1 (555) 123-4567"
                          value={newContact.phone}
                          onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Relationship</label>
                      <Input 
                        placeholder="e.g., Spouse, Sibling, Attorney"
                        value={newContact.relationship}
                        onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleAddContact}>
                    Add Emergency Contact
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Blackbox;
