import "regenerator-runtime/runtime.js";
import { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { inject } from '@vercel/analytics';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SpeechRecorder from "./components/SpeechRecorder";
import TranscriptionEditor from "./components/TranscriptionEditor";

// import Footer from "./components/Footer";
import { downloadAsPDF, downloadAsDOCX, downloadAsTXT } from "./utils/downloadUtils";

inject();

const App = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("en-US");
    const [transcript, setTranscript] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const { transcript: liveTranscript, interimTranscript } = useSpeechRecognition();

    useEffect(() => {
        if (liveTranscript || interimTranscript) {
            setTranscript(liveTranscript + interimTranscript);
        }
    }, [liveTranscript, interimTranscript]);

    useEffect(() => {
        if (location.pathname !== "/record") {
            setIsRecording(false);
            SpeechRecognition.stopListening();
        }
    }, [location.pathname]);

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
        navigate("/record");
        SpeechRecognition.startListening({ continuous: true, language: selectedLanguage });
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        SpeechRecognition.stopListening();
    };

    const handleGoHome = () => {
        handleStopRecording();
        navigate("/");
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
        <div className="min-h-screen mesh-gradient text-white">
            <Navbar onHomeClick={handleGoHome} showBackToHome={location.pathname === "/record"} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Hero
                            onStartRecording={handleStartRecording}
                            onUploadAudio={handleUploadAudio}
                            selectedLanguage={selectedLanguage}
                            onLanguageChange={setSelectedLanguage}
                        />
                    }
                />
                <Route
                    path="/record"
                    element={
                        <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
                            <div className="space-y-6 sm:space-y-8 lg:space-y-12">
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
                    }
                />
            </Routes>
            {/* <Footer /> */}
        </div>
    );
};

export default App;




