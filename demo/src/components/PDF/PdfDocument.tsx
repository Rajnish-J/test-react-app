import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  file: File | null;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="border rounded-lg p-4 shadow-lg">
      {file ? (
        <>
          <Document file={URL.createObjectURL(file)} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((prev) => prev - 1)}
            >
              Previous
            </button>
            <p>
              Page {pageNumber} of {numPages}
            </p>
            <button
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              disabled={pageNumber >= (numPages || 1)}
              onClick={() => setPageNumber((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center">Please upload a PDF to view</p>
      )}
    </div>
  );
};

export default PdfViewer;
