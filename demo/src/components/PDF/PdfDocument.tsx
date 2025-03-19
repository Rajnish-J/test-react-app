import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="border-[3px] border-gray-200 rounded-xl p-4 shadow-md">
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {numPages &&
          Array.from({ length: numPages }, (_, index) => (
            <Page key={index} pageNumber={index + 1} className="mb-4" />
          ))}
      </Document>
      <p className="text-gray-600 text-center mt-4">Total Pages: {numPages}</p>
    </div>
  );
};

export default PdfViewer;
