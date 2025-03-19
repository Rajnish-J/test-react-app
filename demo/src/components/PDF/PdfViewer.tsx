import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  file: File;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center p-4">
      <Document file={URL.createObjectURL(file)} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages || 0 }, (_, index) => (
          <Page key={index} pageNumber={index + 1} className="mb-4 shadow-lg" />
        ))}
      </Document>
      <p className="text-gray-600 mt-4">Total Pages: {numPages}</p>
    </div>
  );
};

export default PdfViewer;
