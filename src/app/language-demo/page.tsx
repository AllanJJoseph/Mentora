"use client";

import Navbar from "@/components/Navbar";
import ChatInterface from "@/components/ChatInterface";

export default function LanguageDemo() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 pt-24 selection:bg-indigo-500/30">
      <Navbar />
      
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <header className="mb-12">
            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full uppercase tracking-widest">
              Global Accessibility
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Language Bridge</h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
              Eliminating language barriers to connect rural mentees with global experts. 
              Real-time translation powered by AI ensures seamless communication.
            </p>
          </header>

          <section className="space-y-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
              <h3 className="text-xl font-bold mb-2">Native Language Focus</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Users can configure their UI and mentorship preferences in their native tongue. 
                The system detects and translates on-the-fly.
              </p>
            </div>
            
            <div className="p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl">
              <h3 className="text-xl font-bold mb-2">Voice-to-Text Support</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                For users with low typing proficiency, voice notes are transcribed and automatically translated before reaching the mentor using the Web Speech API.
              </p>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold uppercase w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Voice Feature Active
              </div>
            </div>
          </section>
        </div>

        <div className="flex-1 w-full max-w-md mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[35px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <ChatInterface />
        </div>
      </div>
    </main>
  );
}
