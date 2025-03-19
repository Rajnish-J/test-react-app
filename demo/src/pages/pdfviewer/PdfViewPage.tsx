import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MyApp: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="p-6 flex justify-center space-x-10">
      <h1 className="text-2xl font-bold mb-4">PDF Viewer</h1>
      <Document file="/Dental Select - Dental and Vision.pdf" onLoadSuccess={onDocumentLoadSuccess} className={"border-[3px] border-gray-200 rounded-xl"}>
        {numPages &&
          Array.from({ length: numPages }, (_, index) => (
            <Page key={index} pageNumber={index + 1} className="mb-4" />
          ))}
      </Document>
      <p className="text-gray-600">
        Total Pages: {numPages}
      </p>
    </div>
  );
};

export default MyApp;
