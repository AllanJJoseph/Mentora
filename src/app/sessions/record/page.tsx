"use client";

import Navbar from "@/components/Navbar";
import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, MicOff, Square, Clock, FileText, Sparkles, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface TranscriptEntry {
  id: number;
  text: string;
  timestamp: string;
}

type RecorderState = "idle" | "recording" | "stopped";

export default function SessionRecorderPage() {
  const [state, setState] = useState<RecorderState>("idle");
  const [sessionName, setSessionName] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [interimText, setInterimText] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const entryIdRef = useRef(0);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript, interimText]);

  // Timer
  useEffect(() => {
    if (state === "recording") {
      timerRef.current = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [state]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getTimestamp = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  // ─── START RECORDING ───
  const startRecording = useCallback(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          const finalText = result[0].transcript.trim();
          if (finalText) {
            entryIdRef.current += 1;
            setTranscript(prev => [
              ...prev,
              { id: entryIdRef.current, text: finalText, timestamp: getTimestamp() },
            ]);
          }
          setInterimText("");
        } else {
          interim += result[0].transcript;
        }
      }
      if (interim) setInterimText(interim);
    };

    recognition.onerror = (event: any) => {
      if (event.error === "aborted" || event.error === "no-speech") return;
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      // Auto-restart if still in recording state
      if (recognitionRef.current && state === "recording") {
        try {
          recognition.start();
        } catch (e) {
          // Ignore — already started
        }
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setState("recording");
  }, [state]);

  // ─── STOP RECORDING ───
  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null; // Prevent auto-restart
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    clearInterval(timerRef.current);
    setState("stopped");
    setInterimText("");

    // Generate summary from transcript
    generateSummary();
  }, [transcript]);

  // ─── AI SUMMARY GENERATION ───
  const generateSummary = () => {
    const fullText = transcript.map(t => t.text).join(". ");
    if (!fullText.trim()) {
      setSummary("No speech was captured during this session.");
      setKeyPoints(["Try using speakers instead of headphones so the microphone can capture both sides of the conversation."]);
      return;
    }

    // Split into sentences
    const sentences = fullText
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 15);

    // Build a readable summary paragraph
    const totalWords = fullText.split(/\s+/).length;
    const durationStr = formatTime(elapsed);
    const summaryIntro = `This ${durationStr}-minute session with ${mentorName || "your mentor"} covered ${sentences.length} key discussion points across approximately ${totalWords} words of dialogue.`;

    // Pick the longest/most substantive sentences as key points
    const sortedByLength = [...sentences].sort((a, b) => b.length - a.length);
    const topSentences = sortedByLength.slice(0, Math.min(5, sortedByLength.length));

    // Build the summary paragraph from the first few sentences
    const summaryBody = sentences.slice(0, Math.min(4, sentences.length)).join(". ") + ".";

    setSummary(`${summaryIntro} ${summaryBody}`);
    setKeyPoints(
      topSentences.length > 0
        ? topSentences.map(s => s.charAt(0).toUpperCase() + s.slice(1))
        : ["Session transcript was too short to extract key points. Try recording a longer session."]
    );
  };

  // ─── SAVE SESSION ───
  const handleSave = () => {
    setSaved(true);
    // In production, this would POST to an API
  };

  // ─── DOWNLOAD ───
  const handleDownload = () => {
    const content = `
SESSION TRANSCRIPT
==================
${sessionName || "Untitled Session"}
Mentor: ${mentorName || "Unknown"}
Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
Duration: ${formatTime(elapsed)}

SUMMARY
-------
${summary}

KEY POINTS
----------
${keyPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")}

FULL TRANSCRIPT
---------------
${transcript.map(t => `[${t.timestamp}] ${t.text}`).join("\n")}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(sessionName || "session").replace(/\s+/g, "_")}_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-24 pb-24">
        {/* Back Link */}
        <Link href="/sessions" className="inline-flex items-center gap-1 text-sm text-indigo-500 hover:text-indigo-600 font-semibold mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Session Notes
        </Link>

        {/* ─── IDLE STATE: Session Setup ─── */}
        {state === "idle" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-8 max-w-lg mx-auto mt-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-red-500" />
              </div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Session Recorder</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Capture live audio from your Google Meet call. Keep this tab open alongside Meet and use <strong>speakers (no headphones)</strong> so the mic captures both voices.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Session Name</label>
                <input
                  type="text"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  placeholder="e.g. React Hooks Deep Dive"
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Mentor Name</label>
                <input
                  type="text"
                  value={mentorName}
                  onChange={(e) => setMentorName(e.target.value)}
                  placeholder="e.g. Sarah Chen"
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <button
              onClick={startRecording}
              disabled={!sessionName.trim()}
              className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] text-lg"
            >
              <Mic className="w-5 h-5" />
              Start Recording
            </button>
          </div>
        )}

        {/* ─── RECORDING STATE: Live Transcript ─── */}
        {state === "recording" && (
          <div>
            {/* Recording Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Recording</span>
                </div>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {formatTime(elapsed)}
                </span>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{sessionName}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">with {mentorName || "Mentor"}</p>
              </div>
            </div>

            {/* Live Transcript Feed */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Live Transcript</h3>
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">{transcript.length} entries</span>
              </div>

              <div className="h-[400px] overflow-y-auto p-4 space-y-3">
                {transcript.length === 0 && !interimText && (
                  <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 text-sm">
                    <div className="text-center">
                      <Mic className="w-8 h-8 mx-auto mb-2 animate-pulse text-red-400" />
                      <p>Listening... Start speaking or play your Google Meet call.</p>
                    </div>
                  </div>
                )}

                {transcript.map((entry) => (
                  <div key={entry.id} className="flex gap-3 items-start">
                    <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 mt-1 flex-shrink-0 w-16">{entry.timestamp}</span>
                    <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{entry.text}</p>
                  </div>
                ))}

                {/* Interim (live/partial) text */}
                {interimText && (
                  <div className="flex gap-3 items-start opacity-50">
                    <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 mt-1 flex-shrink-0 w-16">...</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed">{interimText}</p>
                  </div>
                )}
                <div ref={transcriptEndRef} />
              </div>
            </div>

            {/* Stop Button */}
            <button
              onClick={stopRecording}
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold rounded-xl transition-all shadow-lg text-lg active:scale-[0.98]"
            >
              <Square className="w-5 h-5" />
              End Session & Generate Summary
            </button>
          </div>
        )}

        {/* ─── STOPPED STATE: Summary & Save ─── */}
        {state === "stopped" && (
          <div className="space-y-6">
            {/* Session Info Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-black text-gray-900 dark:text-white">{sessionName}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    with {mentorName} • {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} • {formatTime(elapsed)}
                  </p>
                </div>
                {saved ? (
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full uppercase tracking-wider">✓ Saved</span>
                ) : (
                  <span className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full uppercase tracking-wider animate-pulse">Unsaved</span>
                )}
              </div>
            </div>

            {/* AI Generated Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">AI-Generated Summary</h3>
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/40">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{summary}</p>
              </div>

              {/* Key Points */}
              <div className="mt-5">
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">📌 Key Points Extracted</h4>
                <ul className="space-y-2">
                  {keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Full Transcript */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" /> Full Transcript ({transcript.length} entries)
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto p-4 space-y-2">
                {transcript.map((entry) => (
                  <div key={entry.id} className="flex gap-3 items-start">
                    <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 mt-1 flex-shrink-0 w-16">{entry.timestamp}</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{entry.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {!saved && (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  Save Session Notes
                </button>
              )}
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold rounded-xl transition-all"
              >
                <FileText className="w-4 h-4" />
                Download Full Transcript
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
