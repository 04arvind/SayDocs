import "regenerator-runtime/runtime.js";
import { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { inject } from '@vercel/analytics';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SpeechRecorder from "./components/SpeechRecorder";
import TranscriptionEditor from "./components/TranscriptionEditor";

import Footer from "./components/Footer";
import { downloadAsPDF, downloadAsDOCX, downloadAsTXT } from "./utils/downloadUtils";

inject();

const App = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("en-US");
    const [transcript, setTranscript] = useState("");
    const [currentView, setCurrentView] = useState("hero"); // "hero", "recorder"

    const { transcript: liveTranscript, interimTranscript, resetTranscript, listening } = useSpeechRecognition();

    useEffect(() => {
        if (liveTranscript || interimTranscript) {
            setTranscript(liveTranscript + interimTranscript);
        }
    }, [liveTranscript, interimTranscript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">Browser Not Supported</h1>
                    <p>Your browser does not support speech recognition.</p>
                </div>
            </div>
        );
    }

    const handleStartRecording = () => {
        setIsRecording(true);
        setCurrentView("recorder");
        SpeechRecognition.startListening({ continuous: true, language: selectedLanguage });
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        SpeechRecognition.stopListening();
    };

    const handleUploadAudio = () => {
        alert("Audio upload feature coming soon!");
    };

    const handleDownload = (format) => {
        if (!transcript.trim()) {
            alert("Transcript is empty. Start speaking first and try again.");
            return;
        }
        switch (format) {
            case 'pdf':
                downloadAsPDF(transcript, selectedLanguage);
                break;
            case 'docx':
                downloadAsDOCX(transcript, selectedLanguage);
                break;
            case 'txt':
                downloadAsTXT(transcript, selectedLanguage);
                break;
            default:
                break;
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
            <Navbar />
            {currentView === "hero" ? (
                <Hero
                    onStartRecording={handleStartRecording}
                    onUploadAudio={handleUploadAudio}
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={setSelectedLanguage}
                />
            ) : (
                <div className="container mx-auto px-4 py-4 lg:py-8">
                    <div className="space-y-4 lg:space-y-8">
                        <div className="flex justify-center">
                            <SpeechRecorder
                                isRecording={isRecording}
                                onStart={handleStartRecording}
                                onStop={handleStopRecording}
                                selectedLanguage={selectedLanguage}
                            />
                        </div>
                        <TranscriptionEditor
                            transcript={transcript}
                            onTranscriptChange={setTranscript}
                            onDownload={handleDownload}
                        />
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default App;




