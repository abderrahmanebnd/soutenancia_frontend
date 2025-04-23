// components/FileUpload.tsx

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";

export function FileUpload({ field }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      field.onChange([...(field.value || []), ...acceptedFiles]);
    },
    [field]
  );

  const removeFile = (fileToRemove) => {
    field.onChange(field.value.filter((file) => file !== fileToRemove));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  });

  return (
    <div className="space-y-2">
      {/* File List */}
      {field.value?.map((file, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between border rounded-md px-3 py-2 bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <img
              src="/assets/file.png" // Corrected the image path
              alt="doc"
              className="h-5 w-5"
            />
            <span className="text-sm font-medium">{file.name}</span>
            <a
              href={URL.createObjectURL(file)}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-500 underline ml-2"
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

      <div
        {...getRootProps()}
        className="w-full border-dashed border-2 border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-600">Drop the files here ...</p>
        ) : (
          <p className="text-blue-500 font-medium">
            Click here to upload or drop files here
          </p>
        )}
      </div>
    </div>
  );
}
