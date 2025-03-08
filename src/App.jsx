import "regenerator-runtime/runtime.js";
import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

let isActive = false;

function App() {
  const [activestatus, setActivestatus] = useState(
    "Speech Recognition is not active."
  );
  // const [editableText, setEditableText] = useState("");
  
  function startListening(){
    if (!isActive) {
      setActivestatus("Speech Recognition Is Active");
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
      isActive = true;
    } else {
      setActivestatus("Speech Recognition Is Not Active");
      isActive = false;
      SpeechRecognition.stopListening();
    }
  };
  const {transcript,resetTranscript}=useSpeechRecognition();
  const copyText =(text)=>{
    if(!transcript.trim()){
      alert("Transcript is empty. Start speaking first and try again.");
      return;
    }
    navigator.clipboard.writeText(transcript).then(()=>{
      alert("Transcript copied to clipboard.");
    }).catch(()=>{
      alert("Failed to copy text. Please try again.");
    });
  };

  const downloadTranscript = () => {
    if (!transcript.trim()) {
      alert("Transcript is empty. Start speaking first and try again.");
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };
   
  // const handleTextChange=(e)=>{
  //   setEditableText(e.target.value);
  // }

  return (
    <>
      <div className="w-full max-w-md mx-auto p-6 bg-black rounded-lg shadow-lg">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-blue-500">Speech to Text</h2>
            <p className="text-white opacity-70">
              Convert your Speech to text with ease.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              id="btn"
              onClick={startListening}
              className="bg-zinc-950 inline-flex items-center justify-center 
             whitespace-nowrap rounded-md text-sm font-medium 
             border border-blue-500 
             ring-1 ring-blue-500 ring-offset-2 
             transition-all duration-200 
             focus-visible:outline-none focus-visible:ring-1 
             focus-visible:ring-blue-500 focus-visible:ring-offset-2 
             hover:bg-blue-600 hover:border-blue-400 
             hover:shadow-[0_0_10px_2px] hover:shadow-blue-500/50 
             active:scale-95 
             disabled:pointer-events-none disabled:opacity-50 
             h-10 px-4 py-2 text-white gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-5 w-5"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3"></path>
                <path d="M8 10v2a4 4 0 0 0 8 0v-2"></path>
                <line x1={12} x2={12} y1={19} y2={22}></line>
              </svg>
              Start/Stop
            </button>
            <button
              id="btn"
              onClick={resetTranscript}
              className="inline-flex items-center justify-center 
             whitespace-nowrap rounded-md text-sm font-medium 
             border border-blue-500 
             ring-1 ring-blue-500 ring-offset-2 
             transition-all duration-200 
             focus-visible:outline-none focus-visible:ring-2 
             focus-visible:ring-blue-500 focus-visible:ring-offset-2 
             hover:bg-blue-600 hover:border-blue-400 
             hover:shadow-[0_0_10px_2px] hover:shadow-blue-500/50 
             active:scale-95 
             disabled:pointer-events-none disabled:opacity-50 
             h-10 px-4 py-2 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M8 8h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
              <span className="sr-only">Clear</span>
            </button>
            <button
              id="btn"
              onClick={() => copy(transcript)}
              className="inline-flex items-center justify-center 
             whitespace-nowrap rounded-md text-sm font-medium 
             border border-blue-500 
             ring-1 ring-blue-500 ring-offset-2 
             transition-all duration-200 
             focus-visible:outline-none focus-visible:ring-2 
             focus-visible:ring-blue-500 focus-visible:ring-offset-2 
             hover:bg-blue-600 hover:border-blue-400 
             hover:shadow-[0_0_10px_2px] hover:shadow-blue-500/50 
             active:scale-95 
             disabled:pointer-events-none disabled:opacity-50 
             h-10 px-4 py-2 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width={14} height={14} x={8} y={8} rx={2} ry={2}></rect>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
              </svg>
              <span className="sr-only">Copy</span>
            </button>
            <button
              id="btn"
              onClick={downloadTranscript}
              className="inline-flex items-center justify-center 
             whitespace-nowrap rounded-md text-sm font-medium 
             border border-blue-500 
             ring-1 ring-blue-500 ring-offset-2 
             transition-all duration-200 
             focus-visible:outline-none focus-visible:ring-2 
             focus-visible:ring-blue-500 focus-visible:ring-offset-2 
             hover:bg-blue-600 hover:border-blue-400 
             hover:shadow-[0_0_10px_2px] hover:shadow-blue-500/50 
             active:scale-95 
             disabled:pointer-events-none disabled:opacity-50 
             h-10 px-4 py-2 text-white"
            >
              <svg
                xmlns="http://www.w5.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1={12} x2={12} y1={15} y2={5}></line>
              </svg>
              <span className="sr-only">Download</span>
            </button>
          </div>
        </div>

        <textarea
          value={transcript}
          // onChange={handleTextChange}
          className="flex min-h-[66px] 
             ring-offset-background 
             focus-visible:outline-none 
             focus-visible:ring-2 
             focus-visible:ring-ring 
             focus-visible:ring-offset-2 
             w-full resize-none 
             rounded-md border 
             border-input bg-transparent 
             px-3 py-2 text-sm 
             placeholder:text-muted-foreground 
             focus:outline-none 
             focus:ring-1 
             focus:ring-ring 
             disabled:cursor-not-allowed 
             disabled:opacity-50 
             text-white"
          placeholder="Your speech will appear here..."
          rows={4}
          disabled=""
        ></textarea>
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse mr-2"></div>
          <span className="text-white text-sm font-medium text-muted-foreground">
            {activestatus}
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
