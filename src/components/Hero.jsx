import { Mic, Upload, Play } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const Hero = ({ onStartRecording, onUploadAudio, selectedLanguage, onLanguageChange }) => {
  return (
    <div className="relative min-h-0 lg:min-h-screen flex flex-col lg:flex-row items-center justify-center px-8 lg:px-24 pt-10 pb-0 lg:pb-2 gap-12">
      <div className="absolute inset-0 pointer-events-none z-0 animate-pulse lg:animate-none">
        <div className="absolute top-20 left-[10%] w-32 h-32 glass-sphere opacity-40 blur-[1px] animate-pulse lg:animate-none"></div>
        <div className="absolute bottom-40 left-[5%] w-48 h-48 glass-sphere opacity-20 blur-[2px] animate-pulse lg:animate-none"></div>
        <div className="absolute top-1/2 right-[15%] w-24 h-24 glass-sphere opacity-30 blur-[1px] animate-pulse lg:animate-none"></div>
        <div className="absolute -bottom-10 right-[20%] w-64 h-64 glass-sphere opacity-10 animate-pulse lg:animate-none"></div>
        <div className="absolute inset-0 block lg:hidden z-0">
          <svg className="w-full h-full animate-pulse" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#00FFFF', stopOpacity:0.3}} />
                <stop offset="50%" style={{stopColor:'#8A2BE2', stopOpacity:0.3}} />
                <stop offset="100%" style={{stopColor:'#00FFFF', stopOpacity:0.3}} />
              </linearGradient>
            </defs>
            <path fill="url(#waveGradient)" d="M0,160 Q360,120 720,160 T1440,160 V320 H0 Z" />
            <path fill="url(#waveGradient)" d="M0,200 Q360,160 720,200 T1440,200 V320 H0 Z" opacity="0.5" />
            <path fill="url(#waveGradient)" d="M0,240 Q360,200 720,240 T1440,240 V320 H0 Z" opacity="0.2" />
          </svg>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-start text-left relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter mb-8">
          <span className="block lg:hidden">From voice to document in real time</span>
          <span className="hidden lg:block">From voice to document in real time</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mb-12 font-light leading-relaxed">
          Convert your speech into editable text instantly. Download as PDF, DOCX, or TXT with professional formatting.
        </p>
        <div className="flex flex-col items-center gap-4 lg:gap-6 w-full">
          <div className="flex flex-row items-center gap-4 w-full justify-center">
            <button
              onClick={onStartRecording}
              className="bg-primary text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold glow-button flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <Play className="h-4 w-4 sm:h-5 sm:w-5" />
              Start Recording
            </button>
            <button
              onClick={onUploadAudio}
              className="flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold border border-white/10 hover:bg-white/5 transition-all flex-1 sm:flex-none"
            >
              <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
              Upload Audio
            </button>
          </div>
          <div className="relative z-60 flex justify-center">
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 relative flex justify-center items-center h-[100px] lg:h-[500px]">
        {/* Glass card visible on large screens */}
        <div className="hidden lg:block relative z-20 w-full max-w-lg glass-card rounded-xl overflow-hidden shadow-2xl border border-white/20 transform lg:rotate-2 lg:-translate-x-10">
          <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="flex-1 mx-4 bg-black/20 rounded py-1 px-3 text-[10px] text-gray-500 text-center font-mono">app.saydocs.ai/live-session</div>
          </div>
          <div className="p-6 space-y-4 bg-gradient-to-br from-transparent to-primary/5">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Mic className="h-4 w-4 text-primary animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-300">Live Transcription</h4>
                <p className="text-[10px] text-gray-500">Processing real-time stream...</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-3 w-3/4 bg-white/10 rounded-full"></div>
              <div className="h-3 w-1/2 bg-white/10 rounded-full"></div>
              <div className="h-3 w-5/6 bg-gradient-to-r from-primary/30 to-transparent rounded-full animate-pulse"></div>
              <div className="h-3 w-2/3 bg-white/10 rounded-full"></div>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex justify-end items-center">
              <div className="w-20 h-6 bg-primary rounded text-[8px] flex items-center justify-center fon t-bold">EXPORT DOC</div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute lg:-right-4 lg:-bottom-4 top-8 right-4 lg:translate-x-0 z-30 group">
          <div className="relative w-40 h-40 md:w-56 md:h-56">
            <div className="absolute inset-0 mic-3d-texture rounded-full p-6 flex items-center justify-center border border-white/10">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[radial-gradient(circle_at_50%_50%,_#333_0%,_#000_100%)] flex items-center justify-center shadow-inner">
                <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '4px 4px'}}></div>
                <Mic className="text-7xl md:text-9xl text-primary/80 drop-shadow-[0_0_15px_rgba(84,23,207,0.8)]" />
                <div className="absolute bottom-10 left-0 right-0 flex justify-center items-end gap-1 px-4 h-12">
                  <div className="w-1 bg-primary/60 rounded-full animate-[wave_1.2s_infinite]" style={{height: '40%'}}></div>
                  <div className="w-1 bg-primary rounded-full animate-[wave_0.8s_infinite]" style={{height: '70%'}}></div>
                  <div className="w-1 bg-white rounded-full animate-[wave_1s_infinite]" style={{height: '100%'}}></div>
                  <div className="w-1 bg-primary rounded-full animate-[wave_0.9s_infinite]" style={{height: '60%'}}></div>
                  <div className="w-1 bg-primary/60 rounded-full animate-[wave_1.1s_infinite]" style={{height: '30%'}}></div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-white/5 pointer-events-none"></div>
            <div className="absolute -inset-2 rounded-full border border-primary/30 blur-sm"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
