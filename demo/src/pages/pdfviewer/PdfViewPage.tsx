import { useState } from "react";
import PdfUploader from "../../components/PDF/PdfUploader";
import PdfViewer from "../../components/PDF/PddfViewer";

const PdfViewPage = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <PdfUploader onUpload={setPdfFile} />
      {pdfFile && <PdfViewer file={pdfFile} />}
    </div>
  );
};

export default PdfViewPage;
