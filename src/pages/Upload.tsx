
import DashboardLayout from "@/layouts/DashboardLayout";
import UploadZone from "@/components/dashboard/UploadZone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ReceiptText, FileSpreadsheet, FileImage } from "lucide-react";

const Upload = () => {
  return (
    <DashboardLayout
      title="Upload Documents"
      subtitle="Upload your financial documents for processing and analysis"
    >
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="w-full justify-start border-b rounded-none p-0">
            <TabsTrigger value="all" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-money-blue">
              All Documents
            </TabsTrigger>
            <TabsTrigger value="receipts" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-money-blue">
              <ReceiptText className="mr-2 h-4 w-4" />
              Receipts
            </TabsTrigger>
            <TabsTrigger value="invoices" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-money-blue">
              <FileText className="mr-2 h-4 w-4" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="statements" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-money-blue">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Bank Statements
            </TabsTrigger>
            <TabsTrigger value="tax" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-money-blue">
              <FileImage className="mr-2 h-4 w-4" />
              Tax Documents
            </TabsTrigger>
          </TabsList>
          
          {/* We'll use the same upload zone for all tabs in this demo */}
          <TabsContent value="all" className="pt-6">
            <UploadZone />
          </TabsContent>
          <TabsContent value="receipts" className="pt-6">
            <UploadZone />
          </TabsContent>
          <TabsContent value="invoices" className="pt-6">
            <UploadZone />
          </TabsContent>
          <TabsContent value="statements" className="pt-6">
            <UploadZone />
          </TabsContent>
          <TabsContent value="tax" className="pt-6">
            <UploadZone />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Upload;
