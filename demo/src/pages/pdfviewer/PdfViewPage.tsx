import React, { useState } from "react";
import PdfViewer from "../../components/PDF/PdfDocument";

const PdfViewPage: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">PDF Viewer with Upload</h1>

      <div className="mt-6 w-full max-w-3xl">
        {pdfFile ? (
          <PdfViewer file={pdfFile} />
        ) : (
          <p className="text-gray-500 text-center">No PDF selected</p>
        )}
      </div>
    </div>
  );
};

export default PdfViewPage;
