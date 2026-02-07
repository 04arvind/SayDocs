import { Mic, Upload, Play } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const Hero = ({ onStartRecording, onUploadAudio, selectedLanguage, onLanguageChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
              <Mic className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-20"></div>
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          From voice to document in real time
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto px-4">
          Convert your speech into editable text instantly. Download as PDF, DOCX, or TXT with professional formatting.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 px-4">
          <button
            onClick={onStartRecording}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg"
          >
            <Play className="h-4 w-4 sm:h-5 sm:w-5" />
            Start Recording
          </button>
          <button
            onClick={onUploadAudio}
            className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
            Upload Audio
          </button>
        </div>
        <div className="flex justify-center px-4">
          <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
