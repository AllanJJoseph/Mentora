"use client";

import Navbar from "@/components/Navbar";
import HealthBadge from "@/components/HealthBadge";
import { MOCK_MATCHES, MOCK_MENTORS, MOCK_MENTEES } from "@/utils/mockData";

export default function HealthDemo() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 pt-24 selection:bg-indigo-500/30">
      <Navbar />
      
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black mb-4 tracking-tight">Relationship Health Tracker</h1>
          <p className="text-white/60">
            Real-time monitoring of mentor-mentee interaction quality and consistency.
          </p>
        </header>

        <div className="grid gap-12">
          {MOCK_MATCHES.map((match, i) => {
            const mentor = MOCK_MENTORS.find(m => m.uid === match.mentorId)!;
            const mentee = MOCK_MENTEES.find(m => m.uid === match.menteeId);
            return (
              <div key={i} className="group p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl hover:bg-white/10 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex-1">
                  <span className="text-indigo-400 text-sm font-bold tracking-widest uppercase mb-2 block">Match Overview</span>
                  <h3 className="text-2xl font-black text-white mb-2">{mentor.displayName} × {mentee?.displayName || "Mentee"}</h3>
                  <p className="text-white/40 text-sm mb-4">Established {new Date(match.createdAt).toLocaleDateString()}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-3 rounded-xl">
                      <p className="text-xs text-white/40 uppercase mb-1">Streak</p>
                      <p className="font-bold text-lg">{match.streakCount} Sessions</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <p className="text-xs text-white/40 uppercase mb-1">Missed</p>
                      <p className="font-bold text-lg text-rose-400">{match.missedSessions} Total</p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <HealthBadge status={match.healthStatus} score={match.engagementScore} />
                </div>
              </div>
            );
          })}
        </div>
        
        <section className="mt-12 p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-3xl">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="p-1 px-2 bg-indigo-500 rounded text-xs">AI</span> Smart Nudging Logic
          </h3>
          <p className="text-white/60 leading-relaxed mb-6">
            When health drops below <span className="text-amber-400 font-bold">40%</span>, Mentora automatically triggers custom 
            nudges for both parties to re-engage.
          </p>
          <div className="flex gap-4">
            <a href="/nudges" className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-full text-sm font-bold transition-all">
              Configure Nudges
            </a>
            <a href="/nudges" className="px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-sm font-bold transition-all">
              View Rules
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
