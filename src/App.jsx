import "regenerator-runtime/runtime.js";
import { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { jsPDF } from "jspdf";
// import QuillEditor from "./QuillEditor";

const SayDocs = () => {
    const [isRecording, setIsRecording] = useState(false);
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState("Speech Recognition is not active.");
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return <span>Your browser does not support speech recognition.</span>;
    }

    const handleStart = () => {
        setIsRecording(true);
        setStatusMessage("Speech Recognition Is Active");
        SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    };

    const handleStop = () => {
        setIsRecording(false);
        setStatusMessage("Speech Recognition Is Not Active");
        SpeechRecognition.stopListening();
    };

    const handleReset = () => {
        resetTranscript();
    };

    const copyText = () => {
        if (!transcript.trim()) {
            alert("Transcript is empty. Start speaking first and try again.");
            return;
        }
        navigator.clipboard.writeText(transcript)
            .then(() => alert("Transcript copied to clipboard."))
            .catch(() => alert("Failed to copy text. Please try again."));
    };

    const downloadTranscript = (format) => {
        if (!transcript.trim()) {
            alert("Transcript is empty. Start speaking first and try again.");
            return;
        }
        if (format === "pdf") {
            
            const doc = new jsPDF();
            const marginLeft = 10;
            const marginTop = 10;
            const maxWidth = 180; // Adjust width to fit the page
            const wrappedText = doc.splitTextToSize(transcript, maxWidth);
            doc.text(wrappedText, marginLeft, marginTop);
            doc.save("transcript.pdf");

            doc.save("transcript.pdf");
        } else {
            const element = document.createElement("a");
            let file;
            if (format === "txt") {
                file = new Blob([transcript], { type: "text/plain" });
                element.download = "transcript.txt";
            } else if (format === "doc") {
                file = new Blob([transcript], { type: "application/msword" });
                element.download = "transcript.doc";
            }
            element.href = URL.createObjectURL(file);
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            URL.revokeObjectURL(element.href);
        }
        setIsDownloadOpen(false);
    };

    return (
        <div className="w-screen h-screen flex flex-col bg-gray-900 text-white">
            <div className="p-4 flex items-center justify-between bg-gray-800 shadow-lg">
                <span className="text-2xl font-bold">SayDocs</span>
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold">Login</button>
                    <button onClick={() => setIsNavOpen(!isNavOpen)} className="text-3xl focus:outline-none">
                        &#9776;
                    </button>
                </div>
            </div>

            {isNavOpen && (
                <div className="absolute top-16 left-0 w-64 bg-gray-800 shadow-xl p-4 space-y-4">
                    <a href="#" className="block text-gray-300 hover:text-white">Home</a>
                    <a href="#" className="block text-gray-300 hover:text-white">Settings</a>
                    <a href="#" className="block text-gray-300 hover:text-white">About</a>
                </div>
            )}
            
            
            <div className="flex-1 overflow-auto p-6 space-y-4 flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl p-4 bg-gray-700 rounded-xl text-left text-gray-300 h-40 overflow-y-auto">
                    {transcript || "Your speech will appear here..."}
                </div>
                <div className="text-sm text-gray-400">{statusMessage}</div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-3xl p-4 bg-gray-800 shadow-lg rounded-xl flex flex-col items-center border border-gray-600">
    <div className="flex items-center gap-4 w-full">
        <button 
            className={`w-14 h-14 flex items-center justify-center rounded-full font-bold text-2xl transition-all 
            ${isRecording ? "bg-red-500 animate-pulse shadow-red-500" : "bg-blue-500 hover:bg-blue-600 shadow-blue-500"}`} 
            onClick={isRecording ? handleStop : handleStart}>
            {isRecording ? "⏹️" : "🎤"}
        </button>
        <textarea
            className="flex-1 p-3 bg-gray-700 rounded-lg text-white resize-none h-16 w-full" 
            value={transcript} 
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your speech will appear here..."
        />
        <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-lg font-semibold shadow-lg transition" onClick={handleReset}>
            🔄 Reset
        </button>
        <button className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-lg font-semibold shadow-lg transition" onClick={copyText}>
            📋 Copy
        </button>
        <button onClick={() => setIsDownloadOpen(!isDownloadOpen)} className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-lg font-semibold shadow-lg transition">
            📥 Download ▼
        </button>
    </div>
    {isDownloadOpen && (
        <div className="w-32 bg-gray-700 shadow-lg rounded-lg text-white mt-2">
            <button onClick={() => downloadTranscript("txt")} className="block w-full text-left px-4 py-2 hover:bg-gray-600">TXT</button>
            <button onClick={() => downloadTranscript("pdf")} className="block w-full text-left px-4 py-2 hover:bg-gray-600">PDF</button>
            <button onClick={() => downloadTranscript("doc")} className="block w-full text-left px-4 py-2 hover:bg-gray-600">DOC</button>
        </div>
    )}
</div>

            
        </div>
    );
};

export default SayDocs;




