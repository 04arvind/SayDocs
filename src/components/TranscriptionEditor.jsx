import { Download, Copy, FileText, File } from 'lucide-react';
import { useState, useRef } from 'react';
import QuillEditor from '../QuillEditor';

const TranscriptionEditor = ({ transcript, onTranscriptChange, onDownload }) => {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const quillRef = useRef();

  const getPlainText = () => {
    if (quillRef.current) {
      return quillRef.current.getText();
    }
    return transcript.replace(/<[^>]*>/g, ''); // Fallback strip HTML
  };

  const handleCopy = () => {
    const plainText = getPlainText();
    if (!plainText.trim()) {
      alert('Transcript is empty. Start speaking first and try again.');
      return;
    }
    navigator.clipboard.writeText(plainText)
      .then(() => alert('Transcript copied to clipboard.'))
      .catch(() => alert('Failed to copy text. Please try again.'));
  };

  const handleDownload = (format) => {
    const plainText = getPlainText();
    if (!plainText.trim()) {
      alert('Transcript is empty. Start speaking first and try again.');
      return;
    }
    onDownload(format, plainText);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 lg:p-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <h2 className="text-lg lg:text-xl font-bold text-white">Transcription Editor</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 lg:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm lg:text-base"
          >
            <Copy className="h-3 w-3 lg:h-4 lg:w-4" />
            Copy
          </button>
          <div className="relative">
            <button
              onClick={() => setIsDownloadOpen(!isDownloadOpen)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 lg:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm lg:text-base"
            >
              <Download className="h-3 w-3 lg:h-4 lg:w-4" />
              Download
            </button>
            {isDownloadOpen && (
              <div className="absolute top-full mt-2 right-0 bg-gray-800/90 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-50 min-w-32">
                <button
                  onClick={() => { handleDownload('pdf'); setIsDownloadOpen(false); }}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                >
                  <FileText className="h-3 w-3 lg:h-4 lg:w-4" />
                  PDF
                </button>
                <button
                  onClick={() => { handleDownload('docx'); setIsDownloadOpen(false); }}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                >
                  <File className="h-3 w-3 lg:h-4 lg:w-4" />
                  DOCX
                </button>
                <button
                  onClick={() => { handleDownload('txt'); setIsDownloadOpen(false); }}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                >
                  <FileText className="h-3 w-3 lg:h-4 lg:w-4" />
                  TXT
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-64">
        <QuillEditor value={transcript} onChange={onTranscriptChange} />
      </div>
    </div>
  );
};

export default TranscriptionEditor;
