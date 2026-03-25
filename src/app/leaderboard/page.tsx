"use client";

import Navbar from "@/components/Navbar";
import { useProfile } from "@/context/ProfileContext";
import { DATASET_MENTEES } from "@/utils/dataset";
import { LeaderboardEntry } from "@/types";
import { Trophy, Flame, ChevronUp } from "lucide-react";

export default function LeaderboardPage() {
  const { profile } = useProfile();
  const userName = profile?.fullName || "You";

  // Dynamically generate leaderboard from real dataset mentees
  const LEADERBOARD: LeaderboardEntry[] = DATASET_MENTEES.slice(0, 12).map((m, i) => ({
    userId: m.id,
    displayName: i === 2 ? userName : m.name, // Rank 3 = current user
    role: "mentee" as const,
    score: Math.max(4520 - i * 300, 500),
    rank: i + 1,
    badges: i === 0 ? ["🥇", "🔥"] : i === 1 ? ["🥈", "⭐"] : i === 2 ? ["🥉", "🚀"] : i < 5 ? ["⭐"] : i < 7 ? ["🎯"] : [],
    streak: Math.max(12 - i * 2, 0),
  }));

  const topTen = LEADERBOARD.slice(0, 10);
  const topThree = topTen.slice(0, 3);
  const restOfBoard = topTen.slice(3);

  // Helper to reorder [1, 2, 3] to [2, 1, 3] for Podium Visual Layout
  const podiumLayout = [topThree[1], topThree[0], topThree[2]];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-24">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full mb-4">
            <Trophy className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Global Leaderboard</h1>
          <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-full mb-4 tracking-widest uppercase">Weekly Rankings (Updates in 4 Days)</span>
          <p className="text-lg text-gray-600 dark:text-gray-400">Compete with your peers by maintaining active streaks, scoring high on engagements, and unlocking badges.</p>
        </header>

        {/* The Top 3 Premium Podium */}
        <div className="flex flex-row justify-center items-end gap-2 md:gap-6 mb-16 h-80 px-2 mt-20">
          {podiumLayout.map((user, idx) => {
            if (!user) return null;
            // idx 0 -> Rank 2, idx 1 -> Rank 1, idx 2 -> Rank 3
            const isFirst = user.rank === 1;
            const isSecond = user.rank === 2;
            const isThird = user.rank === 3;
            const isCurrentUser = user.displayName === userName;

            const heightClass = isFirst ? "h-64" : isSecond ? "h-52" : "h-40";
            const colorClass = isFirst 
              ? "bg-gradient-to-t from-yellow-300 to-yellow-100 dark:from-yellow-700/80 dark:to-yellow-500 border-yellow-400" 
              : isSecond 
              ? "bg-gradient-to-t from-gray-300 to-gray-100 dark:from-gray-700/80 dark:to-gray-500 border-gray-400" 
              : "bg-gradient-to-t from-orange-400/80 to-orange-200/80 dark:from-orange-800/80 dark:to-orange-600/80 border-orange-500/80";

            const crownColor = isFirst ? "text-yellow-500" : isSecond ? "text-gray-400" : "text-orange-500";

            return (
              <div key={user.userId} className="relative flex flex-col items-center flex-1 max-w-[160px] animate-fade-in group">
                
                {/* Floating Avatar/Medal Above Podium */}
                <div className={`absolute -top-16 z-10 flex flex-col items-center transition-transform duration-300 group-hover:-translate-y-2`}>
                   
                   {isFirst ? (
                     <img src="/medals/1st.jpg?v=2" alt="1st Place Gold" className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover drop-shadow-2xl z-20" />
                   ) : isSecond ? (
                     <img src="/medals/2nd.jpg?v=2" alt="2nd Place Silver" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover drop-shadow-xl z-20" />
                   ) : isThird ? (
                     <img src="/medals/3rd.jpg?v=2" alt="3rd Place Bronze" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover drop-shadow-xl z-20" />
                   ) : (
                     <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-black text-xl md:text-2xl shadow-xl border-4 bg-white dark:bg-gray-800 border-white dark:border-gray-800 text-gray-800 dark:text-gray-200`}>
                       {user.displayName.charAt(0)}
                     </div>
                   )}
                   
                   <div className={`mt-2 font-black text-center text-sm md:text-base leading-tight z-30 ${isCurrentUser ? 'text-indigo-600 dark:text-indigo-400 text-lg' : 'text-gray-900 dark:text-white'}`}>
                     {isCurrentUser ? "You!" : user.displayName.split(' ')[0]}
                   </div>
                   <div className="text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1 mt-1 bg-white/50 dark:bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm z-30 border border-gray-200/50 dark:border-gray-700/50">
                     {user.score} XP
                   </div>
                </div>

                {/* Vertical Podium Block */}
                <div className={`w-full ${heightClass} ${colorClass} rounded-t-xl border-t-4 border-l-2 border-r-2 shadow-2xl relative overflow-hidden flex flex-col justify-end items-center pb-6`}>
                   <div className="absolute inset-0 bg-white/20 dark:bg-black/20 mix-blend-overlay"></div>
                   <h2 className={`text-6xl md:text-7xl font-black ${crownColor} drop-shadow-md opacity-50`}>{user.rank}</h2>
                </div>
              </div>
            )
          })}
        </div>

        {/* Remaining Ranks Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Challenger Rankings
            </h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {restOfBoard.map((user) => (
              <div key={user.userId} className={`flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${user.displayName === userName ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : ''}`}>
                <div className="w-8 font-bold text-gray-400 dark:text-gray-500 mr-4 text-lg">
                  #{user.rank}
                </div>
                
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300 mr-4">
                  {user.displayName.charAt(0)}
                </div>
                
                <div className="flex-1">
                  <div className={`font-bold ${user.displayName === userName ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'}`}>
                    {user.displayName} {user.displayName === userName && '(You)'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <span className="flex items-center text-orange-500 font-semibold"><Flame className="w-3 h-3 mr-0.5" /> {user.streak} Week Streak</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-gray-900 dark:text-white">{user.score} XP</div>
                  <div className="text-xs font-semibold text-emerald-500 flex items-center justify-end gap-1">
                    <ChevronUp className="w-3 h-3" /> Trending
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
