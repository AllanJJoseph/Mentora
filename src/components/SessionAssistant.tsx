"use client";

import { useState } from "react";
import { SessionService } from "@/services/sessionService";

export default function SessionAssistant() {
  const [notes, setNotes] = useState("");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleProcess = async () => {
    if (!notes) return;
    setProcessing(true);
    const data = await SessionService.processSessionNotes("match_active", notes);
    setResult(data);
    setProcessing(false);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
      <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
        <span className="p-2 bg-indigo-500 rounded-lg text-white">✨</span>
        AI Session Assistant
      </h2>

      {!result ? (
        <div className="space-y-4">
          <p className="text-white/60 text-sm">Paste your informal session notes or conversation highlights below.</p>
          <textarea
            className="w-full h-48 bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
            placeholder="e.g., We talked about React hooks. Mentee is struggling with useEffect. Goal for next week: build a simple counter with persistent data..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button
            onClick={handleProcess}
            disabled={processing || !notes}
            className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20"
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></div>
                Analyzing with Gemini...
              </span>
            ) : "Generate Summary & Action Items"}
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          <section>
            <h3 className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-3">AI Summary</h3>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-white/80 leading-relaxed italic">
              &ldquo;{result.summary}&rdquo;
            </div>
          </section>

          <section>
            <h3 className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-3">Next Steps & Action Items</h3>
            <ul className="space-y-3">
              {result.actionItems.map((item: string, i: number) => (
                <li key={i} className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/5 group hover:border-indigo-500/30 transition-all">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-indigo-500/50 flex items-center justify-center text-xs text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    {i + 1}
                  </span>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <button
            onClick={() => setResult(null)}
            className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm font-medium transition-all"
          >
            Process New Notes
          </button>
        </div>
      )}
    </div>
  );
}
