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
    <div className="glass-card rounded-xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Transcription Editor</h2>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full flex items-center gap-2 transition-colors text-xs sm:text-sm lg:text-base glow-button"
          >
            <Copy className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
            Copy
          </button>
          <div className="relative">
            <button
              onClick={() => setIsDownloadOpen(!isDownloadOpen)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full flex items-center gap-2 transition-colors text-xs sm:text-sm lg:text-base glow-button"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              Download
            </button>
            {isDownloadOpen && (
              <div className="absolute top-full mt-2 right-0 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 min-w-32 sm:min-w-40">
                <button
                  onClick={() => { handleDownload('pdf'); setIsDownloadOpen(false); }}
                  className="flex items-center gap-2 sm:gap-3 w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-white hover:bg-gray-700 transition-colors text-xs sm:text-sm"
                >
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                  PDF
                </button>
                <button
                  onClick={() => { handleDownload('docx'); setIsDownloadOpen(false); }}
                  className="flex items-center gap-2 sm:gap-3 w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-white hover:bg-gray-700 transition-colors text-xs sm:text-sm"
                >
                  <File className="h-3 w-3 sm:h-4 sm:w-4" />
                  DOCX
                </button>
                <button
                  onClick={() => { handleDownload('txt'); setIsDownloadOpen(false); }}
                  className="flex items-center gap-2 sm:gap-3 w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-white hover:bg-gray-700 transition-colors text-xs sm:text-sm"
                >
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                  TXT
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-48 sm:min-h-64">
        <QuillEditor value={transcript} onChange={onTranscriptChange} />
      </div>
    </div>
  );
};

export default TranscriptionEditor;
