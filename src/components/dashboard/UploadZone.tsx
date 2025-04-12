
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: "uploading" | "complete" | "error";
}

const UploadZone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = (selectedFiles: File[]) => {
    const allowedTypes = [
      "application/pdf", 
      "image/jpeg", 
      "image/png", 
      "image/tiff",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
    
    const validFiles = selectedFiles.filter(file => allowedTypes.includes(file.type));
    
    if (validFiles.length !== selectedFiles.length) {
      toast({
        title: "Unsupported file format",
        description: "Some files were not added. Please upload PDF, Excel, or image files only.",
        variant: "destructive",
      });
    }
    
    const newFiles = validFiles.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: "uploading" as const
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Simulate file upload progress and completion
    newFiles.forEach(file => {
      const interval = setInterval(() => {
        setFiles(currentFiles => {
          const fileToUpdate = currentFiles.find(f => f.id === file.id);
          if (!fileToUpdate) return currentFiles;
          
          let newProgress = fileToUpdate.progress + 10;
          
          if (newProgress >= 100) {
            clearInterval(interval);
            newProgress = 100;
            
            // After upload completes, show toast
            toast({
              title: "Upload Complete",
              description: `${file.name} was successfully uploaded.`,
              variant: "default",
            });
            
            return currentFiles.map(f =>
              f.id === file.id
                ? { ...f, progress: newProgress, status: "complete" as const }
                : f
            );
          }
          
          return currentFiles.map(f =>
            f.id === file.id ? { ...f, progress: newProgress } : f
          );
        });
      }, 400);
    });
  };

  const handleRemoveFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div 
        className={`upload-zone ${isDragging ? "upload-zone-active animate-pulse-border" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          multiple
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.tiff,.xls,.xlsx"
        />
        <div className="flex flex-col items-center justify-center">
          <div className="bg-money-blue/10 p-4 rounded-full mb-4">
            <Upload className="h-8 w-8 text-money-blue" />
          </div>
          <h3 className="text-lg font-medium text-money-slate mb-2">
            Drag and drop your financial documents
          </h3>
          <p className="text-muted-foreground mb-4 text-center max-w-md">
            Upload invoices, receipts, tax returns, bank statements, or any other financial document.
            We support PDF, Excel, and image formats.
          </p>
          <Button 
            type="button"
            className="bg-money-blue hover:bg-money-blue/90"
          >
            Browse Files
          </Button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-4 animate-slide-up">
          <h3 className="text-lg font-medium">Uploaded Documents</h3>
          
          <div className="border rounded-lg divide-y">
            {files.map((file) => (
              <div key={file.id} className="p-4 flex items-center gap-4">
                <div className="bg-muted rounded p-2">
                  <File className="h-6 w-6 text-muted-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="truncate font-medium">{file.name}</div>
                    <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
                  </div>
                  
                  <div className="w-full">
                    <Progress value={file.progress} className="h-1" />
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center">
                      {file.status === "uploading" && (
                        <span className="text-xs text-muted-foreground">Uploading... {file.progress}%</span>
                      )}
                      {file.status === "complete" && (
                        <span className="text-xs text-money-success flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </span>
                      )}
                      {file.status === "error" && (
                        <span className="text-xs text-money-error flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Error
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(file.id);
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
