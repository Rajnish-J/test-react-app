import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import PdfViewer from "../../components/PDF/PdfViewer";

const PdfUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  // Handle file selection
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      {file ? (
        <PdfViewer file={file} />
      ) : (
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-gray-300 rounded-lg w-3/4 max-w-xl p-10 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <FaUpload />
            <p className="text-gray-500">Drag and Drop files here</p>
            <p className="text-sm text-gray-400">
              Files Supported: PDF, XLSX, DOCX
            </p>
            <p className="text-gray-500 my-2">Or</p>
            <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
              Choose File
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfUploader;
