import React, { useState, useRef } from "react";

interface PdfUploaderProps {
  onUpload: (file: File) => void;
}

const PdfUploader: React.FC<PdfUploaderProps> = ({ onUpload }) => {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onUpload(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      onUpload(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-lg">
      <div
        className={`w-80 h-40 flex items-center justify-center border-2 ${
          dragging ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-gray-50"
        } rounded-lg cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <p className="text-gray-600">
          {dragging ? "Drop the file here" : "Drag & Drop PDF or Click to Upload"}
        </p>
      </div>
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Upload PDF
      </button>
    </div>
  );
};

export default PdfUploader;
