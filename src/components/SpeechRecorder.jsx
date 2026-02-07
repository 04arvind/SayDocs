import { Mic, Square, Pause, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import SpeechRecognition from 'react-speech-recognition';

const SpeechRecorder = ({ isRecording, onStart, onStop, selectedLanguage }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [waveform, setWaveform] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    let interval;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setWaveform(prev => prev.map(() => Math.random() * 40 + 10));
      }, 200);
    } else {
      setWaveform([0, 0, 0, 0, 0]);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="flex flex-col items-center space-y-4 lg:space-y-6">
      <div className="relative">
        <button
          onClick={isRecording ? onStop : onStart}
          className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center text-white font-bold text-xl lg:text-2xl transition-all duration-300 shadow-lg ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-red-500/50'
              : 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/50'
          }`}
        >
          {isRecording ? <Square className="h-6 w-6 lg:h-8 lg:w-8" /> : <Mic className="h-6 w-6 lg:h-8 lg:w-8" />}
        </button>
        {isRecording && (
          <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-30"></div>
        )}
      </div>
      {isRecording && (
        <div className="flex items-center space-x-2 lg:space-x-4">
          <button
            onClick={handlePauseResume}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 lg:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm lg:text-base"
          >
            {isPaused ? <Play className="h-3 w-3 lg:h-4 lg:w-4" /> : <Pause className="h-3 w-3 lg:h-4 lg:w-4" />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      )}
      {isRecording && (
        <div className="flex items-end justify-center space-x-1 h-8 lg:h-12">
          {waveform.map((height, index) => (
            <div
              key={index}
              className="w-1.5 lg:w-2 bg-blue-400 rounded-full transition-all duration-200"
              style={{ height: `${height * 0.6}px` }}
            ></div>
          ))}
        </div>
      )}
      <p className="text-gray-300 text-center text-sm lg:text-base px-4">
        {isRecording
          ? isPaused
            ? `Paused recording in ${selectedLanguage}...`
            : `Recording in ${selectedLanguage}...`
          : 'Click to start recording'
        }
      </p>
    </div>
  );
};

export default SpeechRecorder;
