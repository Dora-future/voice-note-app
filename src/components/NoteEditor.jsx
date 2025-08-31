// src/utils/exportNotes.js

import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import jsPDF from "jspdf";

/**
 * Export note to Word (.docx)
 */
export const exportToWord = (note) => {
  if (!note) return;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: note.title || "Untitled Note",
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun({
                text: note.content || "",
                size: 24,
              }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${note.title || "note"}.docx`);
  });
};

/**
 * Export note to PDF*
