import React, { useState } from "react";
import PdfUploader from "../../components/PDF/PdfUploader";
import PdfViewer from "../../components/PDF/PddfViewer";

const PdfViewPage: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">PDF Viewer with Upload</h1>
      <PdfUploader onUpload={setPdfFile} />
      <div className="mt-4">
        <PdfViewer file={pdfFile} />
      </div>
    </div>
  );
};

export default PdfViewPage;
