import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

interface PdfViewerProps {
  file: File;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker; // Set worker source

    const loadPdf = async () => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        const pdfData = new Uint8Array(reader.result as ArrayBuffer);
        const loadedPdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        setPdf(loadedPdf);
        renderPage(loadedPdf, pageNum, scale);
      };
    };
    loadPdf();
  }, [file]);

  const renderPage = async (pdf: any, pageNum: number, scale: number) => {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx!,
      viewport,
    };
    await page.render(renderContext).promise;
  };

  useEffect(() => {
    if (pdf) renderPage(pdf, pageNum, scale);
  }, [pageNum, scale]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <canvas ref={canvasRef} className="border shadow-lg" />

      <div className="flex gap-4">
        <button
          onClick={() => setScale((prev) => Math.min(prev + 0.1, 2))}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
        >
          Zoom In
        </button>
        <button
          onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
        >
          Zoom Out
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setPageNum((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
        >
          Prev Page
        </button>
        <span className="text-lg font-semibold">Page {pageNum}</span>
        <button
          onClick={() =>
            setPageNum((prev) => Math.min(prev + 1, pdf?.numPages))
          }
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
