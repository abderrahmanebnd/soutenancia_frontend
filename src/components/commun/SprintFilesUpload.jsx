import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";

export function SprintFilesUpload({ files, setFiles }) {
  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      // Prevent uploading if a file is already present
      if (files.length > 0) {
        toast.error("You can only upload one file at a time.");
        return;
      }

      const validFiles = acceptedFiles
        .filter((file) => file.size <= 10 * 1024 * 1024)
        .map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

      if (
        fileRejections.length > 0 ||
        validFiles.length < acceptedFiles.length
      ) {
        toast.error("File is too large (max 10MB).");
      }

      // Only take the first valid file
      if (validFiles.length > 0) {
        setFiles([validFiles[0]]);
      }
    },
    [files]
  );

  const removeFile = (fileToRemove) => {
    URL.revokeObjectURL(fileToRemove.preview);
    setFiles([]);
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
    noClick: files.length > 0,
    noDrag: files.length > 0,
  });

  return (
    <div className="space-y-2">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`w-full border-dashed border-2 rounded-md p-4 text-center cursor-pointer transition ${
          files.length > 0
            ? "border-gray-200 bg-gray-100 cursor-not-allowed"
            : "border-gray-300 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-600">Drop the file here ...</p>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="bg-background p-4 w-fit rounded-xl">
              <Upload className="w-10 h-10 text-primary" />
            </div>

            {files.length === 0 ? (
              <div>
                <p className="text-base font-medium text-primary">
                  Drag and drop your files here or click to browse
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Supports multiple files: PDF, Word, PowerPoint, Excel, and
                  images up to 10MB each
                </p>
              </div>
            ) : (
              <p className="text-primary">
                A file has already been uploaded submit it first and then upload
                another one
              </p>
            )}
          </div>
        )}
      </div>

      {/* File Preview */}
      {files.map((file, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between border rounded-md px-3 py-2 bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <img src="/assets/file.png" alt="doc" className="h-5 w-5" />
            <span className="text-sm font-medium">{file.name}</span>
            <a
              href={file.preview}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-primary underline ml-2"
            >
              Preview
            </a>
            <span className="text-sm text-gray-500 ml-2">
              {(file.size / (1024 * 1024)).toFixed(1)}MB
            </span>
          </div>
          <button onClick={() => removeFile(file)}>
            <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
          </button>
        </div>
      ))}
    </div>
  );
}
