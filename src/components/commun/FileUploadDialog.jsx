import * as React from "react";
import { Upload, X, File } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useAddStudentsExcel } from "@/modules/admin/features/user/useAddStudentsExcel";
import { useAddTeachersExcel } from "@/modules/admin/features/user/useAddTeachersExcel";

export function FileUploadDialog({ role }) {
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const {
    addStudentsExcel,
    isAddingStudentsExcel,
    isSuccessAddingStudentsExcel,
  } = useAddStudentsExcel();
  const {
    addTeachersExcel,
    isAddingTeachersExcel,
    isSuccessAddingTeachersExcel,
  } = useAddTeachersExcel();
  const handleFileSelect = (selectedFiles) => {
    if (!selectedFiles) return;

    const allowedTypes = [
      "application/vnd.ms-excel", // .xls
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    ];

    const allowedExtensions = [".xls", ".xlsx"];

    const validFiles = Array.from(selectedFiles).filter((file) => {
      const fileExtension = "." + file.name.split(".").pop().toLowerCase();
      return (
        allowedTypes.includes(file.type) ||
        allowedExtensions.includes(fileExtension)
      );
    });

    if (validFiles.length !== selectedFiles.length) {
      alert("Please select only Excel files (.xls, .xlsx)");
      return;
    }

    const newFiles = validFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((uploadFile) => {
      const interval = setInterval(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? { ...f, progress: Math.min(f.progress + 10, 100) }
              : f
          )
        );
      }, 200);

      setTimeout(() => clearInterval(interval), 2000);
    });
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const getFileIcon = (fileType) => {
    return <File className="h-4 w-4 text-green-600" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };
  function handleAddStudentsExcel() {
    /* addStudentsExcel(file); */
    const formData = new FormData();

    formData.append("excelFile", files[0].file);

    addStudentsExcel(formData);
  }
  function handleAddTeachersExcel() {
    const formData = new FormData();

    formData.append("excelFile", files[0].file);

    addTeachersExcel(formData);
  }
  React.useEffect(() => {
    if (isSuccessAddingStudentsExcel || isSuccessAddingTeachersExcel) {
      setFiles([]);
      setOpen(false);
    }
  }, [isSuccessAddingStudentsExcel, isSuccessAddingTeachersExcel]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Add Excel File
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Drag and drop Excel files here or click to browse. Only .xls and
            .xlsx files are supported.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drop Excel files here</p>
              <p className="text-sm text-muted-foreground">
                or{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  browse Excel files
                </button>
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
              accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <h4 className="text-sm font-medium">
                Uploaded Files ({files.length})
              </h4>
              {files.map((uploadFile) => (
                <div
                  key={uploadFile.id}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <div className="h-10 w-10 bg-green-50 border border-green-200 rounded flex items-center justify-center">
                    {getFileIcon(uploadFile.file.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {uploadFile.file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(uploadFile.file.size)}
                    </p>
                    {uploadFile.progress < 100 && (
                      <Progress
                        value={uploadFile.progress}
                        className="h-1 mt-1"
                      />
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(uploadFile.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {role === "student" && (
              <Button
                onClick={handleAddStudentsExcel}
                disabled={
                  files.length === 0 ||
                  files.some((f) => f.progress < 100) ||
                  isAddingStudentsExcel
                }
              >
                {isAddingStudentsExcel ? "Please wait" : "Upload Students"}{" "}
                {files.length > 0 && `(${files.length})`}
              </Button>
            )}
            {role === "teacher" && (
              <Button
                onClick={handleAddTeachersExcel}
                disabled={
                  files.length === 0 ||
                  files.some((f) => f.progress < 100) ||
                  isAddingTeachersExcel
                }
              >
                {isAddingTeachersExcel ? "Please wait" : "Upload Teachers"}
                {files.length > 0 && `(${files.length})`}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
