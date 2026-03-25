"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { MOCK_MATCHES, MOCK_MENTEES } from "@/utils/mockData";
import SessionAssistant from "@/components/SessionAssistant";
import CalendarScheduler from "@/components/CalendarScheduler";
import BadgeCard from "@/components/BadgeCard";
import { MENTOR_BADGES } from "@/utils/badges";
import { Calendar, Users, Target, Clock, AlertCircle, Medal } from "lucide-react";

export default function MentorDashboard() {
  const { user } = useAuth();
  const [, triggerRender] = useState(0);
  
  // Find matches where the current user is the mentor
  const myMatches = MOCK_MATCHES.filter(m => m.mentorId === user?.uid || m.mentorId === "mentor_1");
  const myMentees = myMatches.map(match => MOCK_MENTEES.find(m => m.uid === match.menteeId)).filter(Boolean);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <header className="mb-8">
          <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-full mb-3 tracking-widest uppercase">Mentor Portal</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.displayName || "Mentor"}</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your active mentees and log your recent sessions.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Left Column: Analytics & Mentees */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 dark:from-indigo-900 dark:to-blue-900 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="font-semibold text-indigo-100 dark:text-indigo-300 mb-4 opacity-90 tracking-wide uppercase text-xs">Your Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-4xl font-black mb-1">12</div>
                  <div className="text-xs text-indigo-200 dark:text-indigo-400">Sessions Total</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-1">100%</div>
                  <div className="text-xs text-indigo-200 dark:text-indigo-400">Mentee Retention</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                Active Mentees
              </h3>
              <div className="space-y-4">
                {myMentees.map((mentee, i) => {
                  const matchInfo = myMatches[i];
                  return (
                    <div key={i} className="flex flex-col gap-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-600 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                          {mentee?.displayName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-gray-100">{mentee?.displayName}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{matchInfo.engagementScore}% Health Score</div>
                        </div>
                        <div className="ml-auto text-indigo-600 dark:text-indigo-400 text-xl font-black">
                          {matchInfo.streakCount}🔥
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-2 pt-3 border-t border-gray-100 dark:border-gray-600/50">
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                          Missed Sessions: <span className={matchInfo.missedSessions >= 3 ? "text-red-600 mb-0.5 ml-1" : "text-gray-900 dark:text-white ml-1"}>{matchInfo.missedSessions}</span>
                        </div>
                        <button 
                          onClick={async () => {
                            // Increment logic internally (simulated for UI)
                            const currentMissed = (matchInfo.missedSessions || 0) + 1;
                            matchInfo.missedSessions = currentMissed; 
                            
                            // 🚀 SMART NUDGING TRIGGER 🚀
                            if (currentMissed >= 3) {
                              alert(`Critcal Alert: Mentee ${mentee?.displayName} has missed 3 sessions! Firing Smart Nudge API...`);
                              
                              try {
                                await fetch('/api/nudge', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({
                                    menteeName: mentee?.displayName,
                                    mentorName: user?.displayName || "Sarah Chen",
                                    missedCount: currentMissed,
                                    studentEmail: 'allanjj787@gmail.com',
                                    mentorEmail: 'souravv2006@gmail.com',
                                    ngoEmail: 'amritashajikumar@gmail.com',
                                    studentPhone: '+917994093409',
                                    mentorPhone: '+919447823670'
                                  })
                                });
                              } catch (e) {
                                console.error(e);
                              }
                              
                              matchInfo.healthStatus = 'inactive';
                            }
                            
                            // Force re-render gracefully so mock array state isn't wiped
                            triggerRender(prev => prev + 1);
                          }}
                          className="text-xs font-bold bg-amber-100/50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 text-amber-700 dark:text-amber-500 px-3 py-1.5 rounded-lg transition-colors border border-amber-200 dark:border-amber-900/50"
                        >
                          Mark Class as Missed
                        </button>
                      </div>
                    </div>
                  );
                })}

                
                {myMentees.length === 0 && (
                  <div className="text-center p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                    No active mentees assigned yet.
                  </div>
                )}
              </div>
            </div>

            {/* Added: Mentor Badge Showcase */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400 dark:bg-orange-500 opacity-5 dark:opacity-5 rounded-full -mr-16 -mt-16 blur-xl" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Medal className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                Your Honor Badges
              </h3>
              <div className="flex flex-wrap gap-4">
                {MENTOR_BADGES.filter(b => ["m_first", "m_time", "m_guiding_star"].includes(b.id)).map(badge => (
                  <BadgeCard key={badge.id} badge={badge} isUnlocked={true} size="sm" />
                ))}
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-900/50 p-6">
              <h3 className="text-amber-800 dark:text-amber-500 font-bold mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Action Required
              </h3>
              <p className="text-amber-700 dark:text-amber-400/90 text-sm leading-relaxed mb-4">
                You haven't logged your session with {MOCK_MENTEES[0]?.displayName} from yesterday. Log it now to maintain their streak!
              </p>
              <button className="w-full py-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white rounded-lg font-semibold text-sm transition-colors">
                Log Missing Session
              </button>
            </div>
          </div>

          {/* Right Column: AI Session Assistant */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 h-full">
               <div className="mb-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
                 <Target className="w-5 h-5" />
                 <h2>AI Session Logger</h2>
               </div>
               <p className="text-gray-600 dark:text-gray-400 mb-8">
                 Select a mentee and either type or dictate your raw, unstructured session notes. The AI will automatically expand them into a formal summary, extract action items, and update the mentee's goal progress.
               </p>
               <SessionAssistant />
            </div>
          </div>

        </div>

        {/* Master Calendar Block */}
        <section className="mt-8">
          <CalendarScheduler viewRole="mentor" />
        </section>

      </div>
    </main>
  );
}
