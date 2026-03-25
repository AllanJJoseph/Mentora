"use client";

import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MOCK_MATCHES } from "@/utils/mockData";
import MatchCard from "@/components/MatchCard";
import ChatInterface from "@/components/ChatInterface";
import CalendarScheduler from "@/components/CalendarScheduler";
import FeedbackPrompt from "@/components/FeedbackPrompt";
import BadgeCard from "@/components/BadgeCard";
import { MENTEE_BADGES } from "@/utils/badges";
import { Trophy, Target, Award, Flame, MessageSquare, Brain } from "lucide-react";
import Link from "next/link";
import { UserProfile } from "@/types";

export default function MenteeDashboard() {
  const { user } = useAuth();
  const { profile } = useProfile();

  // ─── Read selected mentor from Firestore ───
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [mentorLoading, setMentorLoading] = useState(true);

  useEffect(() => {
    async function loadSelectedMentor() {
      if (!user?.uid) { setMentorLoading(false); return; }
      try {
        const profileDoc = await getDoc(doc(db, "profiles", user.uid));
        if (profileDoc.exists()) {
          const data = profileDoc.data();
          if (data?.selectedMentor) {
            setSelectedMentor(data.selectedMentor);
          }
        }
      } catch (err) {
        console.warn("Failed to load selected mentor:", err);
      }
      setMentorLoading(false);
    }
    loadSelectedMentor();
  }, [user?.uid]);

  // Build a UserProfile object for the MatchCard if we have a selected mentor
  const mentorProfile: UserProfile | null = selectedMentor ? {
    uid: selectedMentor.id,
    email: selectedMentor.email || "",
    displayName: selectedMentor.name,
    role: "mentor",
    skills: selectedMentor.skills || [],
    interests: [],
    location: selectedMentor.location,
    language: selectedMentor.language,
    availability: selectedMentor.availability,
    bio: selectedMentor.bio || `${selectedMentor.education} • Mentor`,
  } : null;

  // Fallback to mock match for streak data
  const activeMatch = MOCK_MATCHES.find(m => m.id === "match_active");
  const displayName = profile?.fullName || user?.displayName || "Mentee";

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <header className="mb-8">
          <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold rounded-full mb-3 tracking-widest uppercase">Mentee Journey</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Keep up the great work, {displayName}!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {profile ? `${profile.educationLevel} • ${profile.preferredLanguage} • ${profile.skills.slice(0, 3).join(", ")}` : "Track your progress, chat with your mentor, and view your leaderboard rank."}
          </p>
        </header>

        {/* Dynamic Post-Session NPS Feedback Interceptor */}
        {selectedMentor && <FeedbackPrompt mentorName={selectedMentor.name} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Analytics & Gamification */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 dark:bg-yellow-500 opacity-10 dark:opacity-5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              
              <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                Gamification Stats
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Current Rank</span>
                    <span className="text-2xl font-black text-gray-900 dark:text-white">#3</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-400 dark:bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Top 15% of all mentees this month!</p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Weekly Streak</span>
                    <span className="text-2xl font-black text-orange-500 dark:text-orange-400 flex items-center gap-1">
                      {activeMatch?.streakCount || 0} <Flame className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 block mb-3">Earned Badges</span>
                  <div className="flex flex-wrap gap-4">
                    {MENTEE_BADGES.filter(b => ["s_first", "s_homework", "s_fast"].includes(b.id)).map(badge => (
                      <BadgeCard key={badge.id} badge={badge} isUnlocked={true} size="sm" />
                    ))}
                    {/* One locked example to drive engagement */}
                    <div className="opacity-50">
                      <BadgeCard badge={MENTEE_BADGES.find(b => b.id === "s_streak")!} isUnlocked={false} size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                Your Mentor
              </h3>
              {mentorProfile && selectedMentor ? (
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                      {selectedMentor.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">{selectedMentor.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{selectedMentor.location} • {selectedMentor.language}</p>
                    </div>
                    <div className="ml-auto px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-black rounded-full">
                      {selectedMentor.score}% Match
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {selectedMentor.skills?.map((skill: string) => (
                      <span key={skill} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-semibold text-gray-600 dark:text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed italic">"{selectedMentor.explanation}"</p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Brain className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">No mentor selected yet.</p>
                  <Link
                    href="/matching"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl shadow-md transition-all text-sm"
                  >
                    <Brain className="w-4 h-4" /> Find My Mentor
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Chat & Translation Bridge */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-0 h-[800px] flex flex-col overflow-hidden">
               <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                   {selectedMentor?.name?.charAt(0) || "M"}
                 </div>
                 <div>
                   <h2 className="font-bold text-gray-900 dark:text-white">{selectedMentor?.name || "Select a Mentor"}</h2>
                   <p className="text-xs text-green-600 dark:text-green-400 font-semibold">• Online (Translated automatically via Language Bridge)</p>
                 </div>
               </div>
               <div className="flex-1 p-6 relative">
                 <ChatInterface />
               </div>
            </div>
          </div>

        </div>

        {/* Master Calendar Block */}
        <section className="mt-8">
          <CalendarScheduler viewRole="mentee" />
        </section>

      </div>
    </main>
  );
}
