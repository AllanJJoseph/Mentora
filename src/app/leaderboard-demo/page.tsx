"use client";

import Navbar from "@/components/Navbar";
import LeaderboardRow from "@/components/LeaderboardRow";
import { LeaderboardEntry } from "@/types";

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    userId: "mentor_1",
    displayName: "Sarah Chen",
    role: "mentor",
    score: 840,
    rank: 1,
    badges: ["Expert Mentor", "Rising Star"],
    streak: 12
  },
  {
    userId: "mentor_2",
    displayName: "James Wilson",
    role: "mentor",
    score: 720,
    rank: 2,
    badges: ["Rising Star", "Consistent Partner"],
    streak: 8
  },
  {
    userId: "mentee_1",
    displayName: "Allan Joe",
    role: "mentee",
    score: 650,
    rank: 3,
    badges: ["Fast Learner"],
    streak: 5
  },
  {
    userId: "mentor_3",
    displayName: "Elena Rodriguez",
    role: "mentor",
    score: 410,
    rank: 4,
    badges: ["Community Favorite"],
    streak: 3
  }
];

export default function LeaderboardDemo() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 pt-24 selection:bg-indigo-500/30">
      <Navbar />
      
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full uppercase tracking-widest">
            Weekly Rankings
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">The Leaderboard</h1>
          <p className="text-white/60 max-w-2xl">
            Celebrating excellence and consistency in mentorship. Rankings reset weekly to maintain fairness and drive continuous impact.
          </p>
        </header>

        <section className="bg-white/5 border border-white/10 rounded-[40px] p-4 md:p-8 backdrop-blur-3xl">
          <div className="flex justify-between items-center mb-8 px-4">
            <h3 className="text-xl font-bold">Top Contributors</h3>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-indigo-500 text-white rounded-full text-xs font-bold uppercase tracking-widest">Mentors</button>
              <button className="px-4 py-1.5 bg-white/5 text-white/60 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Mentees</button>
            </div>
          </div>

          <div className="grid gap-3">
            {MOCK_LEADERBOARD.map((entry) => (
              <LeaderboardRow key={entry.userId} entry={entry} />
            ))}
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-white/10 rounded-[40px] backdrop-blur-xl">
            <h3 className="text-2xl font-black mb-4 tracking-tight">How we rank</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Mentors are scored on session volume (40%), consistency (30%), positive feedback (20%), and goal completion (10%).
            </p>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <span className="w-2 h-2 rounded-full bg-indigo-300"></span>
            </div>
          </div>
          
          <div className="p-8 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-xl flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black mb-4 tracking-tight underline decoration-indigo-500/30 underline-offset-8 decoration-4">Badges</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Earn dynamic badges for outstanding performance and milestones.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Expert Mentor", "Rising Star", "Consistent Partner", "Fast Learner", "Community Favorite"].map(b => (
                <span key={b} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/40 border border-white/10 italic">
                  #{b}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
