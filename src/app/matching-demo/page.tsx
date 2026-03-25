"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import MatchCard from "@/components/MatchCard";
import { MatchingService } from "@/services/matchingService";
import { MOCK_MENTORS, MOCK_MENTEE } from "@/utils/mockData";
import { Match, UserProfile } from "@/types";

export default function MatchingDemo() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generateMatches() {
      const results = await Promise.all(
        MOCK_MENTORS.map(async (mentor) => {
          return await MatchingService.createMatch(mentor, MOCK_MENTEE);
        })
      );
      
      // Sort by score descending
      setMatches(results.sort((a, b) => b.score - a.score));
      setLoading(false);
    }

    generateMatches();
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 pt-24">
      <Navbar />
      
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black mb-4 tracking-tight">AI Matching Demo</h1>
          <p className="text-white/60">
            Comparing <span className="text-indigo-400 font-bold">{MOCK_MENTEE.displayName}</span> against available mentors using the hybrid scoring engine.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {matches.map((match, i) => {
              const mentor = MOCK_MENTORS.find(m => m.uid === match.mentorId)!;
              return (
                <MatchCard 
                  key={i} 
                  mentor={mentor} 
                  score={match.score} 
                  explanation={match.explanation} 
                />
              );
            })}
          </div>
        )}
        
        <footer className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl text-sm text-white/40">
          <p><strong>Scoring Logic:</strong> (Skills × 0.4) + (Language × 0.2) + (Location × 0.2) + (Availability × 0.2)</p>
          <p className="mt-2">Explanations are generated via <span className="text-indigo-400">Gemini 1.5 Flash</span>.</p>
        </footer>
      </div>
    </main>
  );
}
