import React from "react";
import PdfViewer from "../../components/PDF/PdfDocument"; 

const PdfViewPage: React.FC = () => {
  return (
    <div className="p-6 flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold">PDF Viewer</h1>
      <PdfViewer fileUrl="/Dental Select - Dental and Vision.pdf" />
    </div>
  );
};

export default PdfViewPage;
