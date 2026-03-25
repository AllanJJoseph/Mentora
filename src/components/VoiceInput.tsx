"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  language?: string;
}

export default function VoiceInput({ onTranscript, language = "en-US" }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if browser supports Web Speech API
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setIsSupported(false);
      }
    }
  }, []);

  const startListening = () => {
    if (typeof window === "undefined" || !isSupported) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);
      setIsProcessing(true);

      // Simulate a brief processing delay before sending to parent
      setTimeout(() => {
        onTranscript(transcriptText);
        setIsProcessing(false);
        setIsListening(false);
      }, 500);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setIsProcessing(false);
    };

    recognition.onend = () => {
      if (isListening && !transcript) {
        setIsListening(false);
      }
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    setIsProcessing(false);
  };

  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white/40">
        <MicOff className="w-4 h-4" />
        <span>Voice not supported in this browser</span>
      </div>
    );
  }

  return (
    <button
      onClick={isListening ? stopListening : startListening}
      disabled={isProcessing}
      className={`p-3 rounded-xl transition-all border ${
        isListening
          ? "bg-red-500 hover:bg-red-600 border-red-500 text-white animate-pulse"
          : isProcessing
          ? "bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
          : "bg-white/5 hover:bg-white/10 border-white/10 text-white hover:text-indigo-400"
      }`}
      title={isListening ? "Stop recording" : "Start voice input"}
    >
      {isProcessing ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isListening ? (
        <MicOff className="w-5 h-5" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </button>
  );
}
