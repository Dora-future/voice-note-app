import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

// Export to Word (.docx)
export const exportToWord = (note) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: note.title, bold: true, size: 32 }),
            ],
          }),
          new Paragraph(note.folder ? `Folder: ${note.folder}` : ""),
          new Paragraph(note.content || ""),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${note.title || "note"}.docx`);
  });
};

// Export to PDF
export const exportToPDF = (note) => {
  const pdf = new jsPDF();
  pdf.setFontSize(16);
  pdf.text(note.title || "Untitled", 10, 20);
  if (note.folder) pdf.text(`Folder: ${note.folder}`, 10, 30);
  pdf.setFontSize(12);
  pdf.text(note.content || "", 10, 50);
  pdf.save(`${note.title || "note"}.pdf`);
};
