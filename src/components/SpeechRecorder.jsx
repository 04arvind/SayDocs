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
    <div className="flex flex-col items-center space-y-6 lg:space-y-8">
      <div className="relative">
        <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
          <div className="absolute inset-0 mic-3d-texture rounded-full p-6 flex items-center justify-center border border-white/10">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-[radial-gradient(circle_at_50%_50%,_#333_0%,_#000_100%)] flex items-center justify-center shadow-inner">
              <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '4px 4px'}}></div>
              <button
                onClick={isRecording ? onStop : onStart}
                className={`w-full h-full rounded-full flex items-center justify-center text-white font-bold text-2xl lg:text-3xl transition-all duration-300 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-red-500/50'
                    : 'bg-primary hover:bg-primary/80 shadow-primary/50'
                }`}
              >
                {isRecording ? <Square className="h-8 w-8 lg:h-10 lg:w-10" /> : <Mic className="h-8 w-8 lg:h-10 lg:w-10" />}
              </button>
              <div className="absolute bottom-10 left-0 right-0 flex justify-center items-end gap-1 px-4 h-12">
                {waveform.map((height, index) => (
                  <div
                    key={index}
                    className={`w-1 rounded-full transition-all duration-200 ${
                      isRecording && !isPaused ? 'bg-primary' : 'bg-primary/40'
                    }`}
                    style={{
                      height: `${Math.max(10, height * 0.8)}px`,
                      animation: isRecording && !isPaused ? `wave_${1 + index * 0.2}s_infinite` : 'none'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-white/5 pointer-events-none"></div>
          <div className="absolute -inset-2 rounded-full border border-primary/30 blur-sm"></div>
        </div>
        {isRecording && (
          <div className="absolute -inset-4 rounded-full border-4 border-red-400 animate-ping opacity-30"></div>
        )}
      </div>
      {isRecording && (
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePauseResume}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors text-base glow-button"
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      )}
      <div className="glass-card px-6 py-4 rounded-full border border-white/20">
        <p className="text-gray-300 text-center text-base lg:text-lg">
          {isRecording
            ? isPaused
              ? `Paused recording in ${selectedLanguage}...`
              : `Recording in ${selectedLanguage}...`
            : 'Click the microphone to start recording'
          }
        </p>
      </div>
    </div>
  );
};

export default SpeechRecorder;
