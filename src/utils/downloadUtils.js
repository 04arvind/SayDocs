import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';

// Base64 encoded Noto Sans fonts for Unicode support
const notoFonts = {
  // Removed non-Latin fonts: hi-IN, zh-CN, ja-JP, ar-SA
};

export const downloadAsPDF = (text, language = 'en-US') => {
  const doc = new jsPDF();
  const marginLeft = 10;
  const marginTop = 10;
  const maxWidth = 180;
  const plainText = text.replace(/<[^>]*>/g, ''); // Strip HTML tags

  // Check if language requires Unicode font
  if (notoFonts[language]) {
    const font = notoFonts[language];
    doc.addFileToVFS(`${font.name}.ttf`, font.base64);
    doc.addFont(`${font.name}.ttf`, font.name, 'normal');
    doc.setFont(font.name);
  } else {
    // Fallback to default font for Latin scripts
    doc.setFont('helvetica');
  }

  const wrappedText = doc.splitTextToSize(plainText, maxWidth);
  doc.text(wrappedText, marginLeft, marginTop);
  doc.save('transcript.pdf');
};

export const downloadAsDOCX = (text, language = 'en-US') => {
  const plainText = text.replace(/<[^>]*>/g, ''); // Strip HTML tags

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun(plainText)],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.docx';
    a.click();
    window.URL.revokeObjectURL(url);
  });
};

export const downloadAsTXT = (text, language = 'en-US') => {
  // For TXT, encoding is handled by the browser, but we can specify charset if needed
  const plainText = text.replace(/<[^>]*>/g, ''); // Strip HTML tags
  const element = document.createElement('a');
  const file = new Blob([plainText], { type: 'text/plain;charset=utf-8' });
  element.href = URL.createObjectURL(file);
  element.download = 'transcript.txt';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  URL.revokeObjectURL(element.href);
};
