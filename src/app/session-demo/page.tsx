"use client";

import Navbar from "@/components/Navbar";
import SessionAssistant from "@/components/SessionAssistant";

export default function SessionDemo() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 pt-24 selection:bg-indigo-500/30">
      <Navbar />
      
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black mb-4 tracking-tight text-center md:text-left">Automated Session Insights</h1>
          <p className="text-white/60 text-center md:text-left">
            Transforming messy notes into structured growth plans.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          <SessionAssistant />
          
          <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-3xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">How it works</h3>
            <p className="text-white/60 leading-relaxed">
              Mentora uses <span className="text-indigo-400 font-bold underline decoration-indigo-500/30 underline-offset-4">Gemini 1.5 Flash</span> to contextually understand 
              mentorship conversations. It extracts key learnings and assigns actionable next steps, reducing 
              administrative overhead for mentors.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
