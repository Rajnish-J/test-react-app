import React, { useEffect, useState } from "react";

interface PdfViewerProps {
  file: File | null;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPdfUrl(fileUrl);
    }
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl); // Cleanup
    };
  }, [file]);

  if (!file) {
    return (
      <p className="text-gray-500 text-center">
        No PDF selected. Please upload a file.
      </p>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <iframe
        src={pdfUrl!}
        width="80%"
        height="100%"
        className="border rounded-lg shadow-lg"
      />
    </div>
  );
};

export default PdfViewer;
