"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { MOCK_MATCHES, MOCK_MENTEES, MOCK_MENTORS } from "@/utils/mockData";
import HealthBadge from "@/components/HealthBadge";
import { ChevronDown, ChevronUp, BookOpen, Activity, CheckCircle2, Award } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  
  // Aggregate Metrics
  const totalMentors = MOCK_MENTORS.length;
  const totalMentees = MOCK_MENTEES.length;
  const activeMatches = MOCK_MATCHES.filter(m => m.status === 'active').length;
  const atRiskMatches = MOCK_MATCHES.filter(m => m.healthStatus === 'at-risk').length;

  // Accordion State
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <header className="mb-8 flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-6">
          <div>
            <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 text-xs font-bold rounded-full mb-3 tracking-widest uppercase">Admin Privileges</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">NGO Master Console</h1>
            <p className="text-gray-600 dark:text-gray-400">Overview of all mentor-mentee relationships and system health.</p>
          </div>
        </header>

        {/* Dynamic Critical Nudge Alerts */}
        {MOCK_MATCHES.filter(m => (m.missedSessions || 0) >= 3).length > 0 && (
          <div className="mb-8 bg-red-50 dark:bg-red-900/20 border-l-4 border-l-red-500 p-6 rounded-r-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <h2 className="text-lg font-bold text-red-800 dark:text-red-300">Action Required: Attendance Threshold Breached</h2>
            </div>
            <p className="text-sm text-red-700 dark:text-red-400 mb-4 font-semibold">The following students have missed 3 or more consecutive sessions. The automated Smart Nudging protocol (WhatsApp/SMS/Email) has been fired.</p>
            <div className="space-y-2">
              {MOCK_MATCHES.filter(m => (m.missedSessions || 0) >= 3).map(m => {
                 const mentee = MOCK_MENTEES.find(mee => mee.uid === m.menteeId);
                 const mentor = MOCK_MENTORS.find(men => men.uid === m.mentorId);
                 return (
                   <div key={m.id} className="text-sm bg-red-100/50 dark:bg-red-900/30 px-4 py-2 rounded-lg text-red-900 dark:text-red-200">
                     <span className="font-bold underline">{mentee?.displayName}</span> missed {m.missedSessions} classes with <span className="font-bold">{mentor?.displayName}</span>.
                   </div>
                 )
              })}
            </div>
            <div className="mt-4 flex gap-3">
              <button className="text-sm font-bold bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">Acknowledge Array</button>
              <button className="text-sm font-bold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">Escalate to Phone Call</button>
            </div>
          </div>
        )}

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm border-l-4 border-l-blue-500">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Total Mentors</h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalMentors}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm border-l-4 border-l-green-500">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Total Mentees</h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalMentees}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm border-l-4 border-l-purple-500">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Active Matches</h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{activeMatches}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm border-l-4 border-l-red-500 dark:bg-red-900/10 bg-red-50/30">
            <h3 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">At-Risk Matches</h3>
            <div className="text-3xl font-bold text-red-700 dark:text-red-300">{atRiskMatches}</div>
          </div>
        </div>

        {/* Global Match Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Active Relationships Matrix</h2>
            <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">Filter Status</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-900/50">
                  <th className="px-6 py-4 font-semibold">Mentor</th>
                  <th className="px-6 py-4 font-semibold">Mentee</th>
                  <th className="px-6 py-4 font-semibold">Engagement Analytics</th>
                  <th className="px-6 py-4 font-semibold text-center">Current Streak</th>
                  <th className="px-6 py-4 font-semibold text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {MOCK_MATCHES.map(match => {
                  const mnt = MOCK_MENTORS.find(m => m.uid === match.mentorId);
                  const mee = MOCK_MENTEES.find(m => m.uid === match.menteeId);
                  
                  if (!mnt || !mee) return null;
                  const isExpanded = expandedRowId === match.id;

                  return (
                    <React.Fragment key={match.id}>
                      <tr 
                        onClick={() => setExpandedRowId(isExpanded ? null : match.id)}
                        className={`hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors cursor-pointer border-l-4 ${isExpanded ? 'border-l-indigo-500 bg-indigo-50/20 dark:bg-indigo-900/10' : 'border-l-transparent'}`}
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900 dark:text-gray-100">{mnt.displayName}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{mnt.skills.slice(0, 2).join(", ")}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900 dark:text-gray-100">{mee.displayName}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Goal: Improve Tech Skills</div>
                        </td>
                        <td className="px-6 py-4">
                          <HealthBadge status={match.healthStatus} score={match.engagementScore} />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full text-sm">
                            {match.streakCount} 🔥
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                        </td>
                      </tr>

                      {/* EXPANDED DIAGNOSTIC ROW */}
                      {isExpanded && (
                        <tr className="bg-indigo-50/30 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
                          <td colSpan={5} className="px-8 py-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
                              
                              {/* Advanced Metric 1: Attendance */}
                              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                <h4 className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                  <BookOpen className="w-4 h-4 text-indigo-500" /> Attendance Ratio
                                </h4>
                                <div className="flex justify-between items-end">
                                  <div>
                                    <div className="text-2xl font-black text-gray-900 dark:text-white">{match.sessionsAttended || 0}</div>
                                    <div className="text-xs text-gray-500">Sessions Attended</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xl font-bold text-red-500">{match.missedSessions}</div>
                                    <div className="text-xs text-gray-500">Missed</div>
                                  </div>
                                </div>
                              </div>

                              {/* Advanced Metric 2: Academic Scores */}
                              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                <h4 className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                  <Award className="w-4 h-4 text-amber-500" /> Test Performance
                                </h4>
                                <div className="flex gap-1 mb-2">
                                  {(match.testScores || [0,0,0]).map((score, idx) => (
                                    <div key={idx} className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                      <div className={`h-full ${score > 80 ? 'bg-emerald-500' : score > 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${score}%` }}></div>
                                    </div>
                                  ))}
                                </div>
                                <div className="text-xs font-bold text-gray-600 dark:text-gray-300">
                                  Average: {Math.round((match.testScores || []).reduce((a, b) => a + b, 0) / (match.testScores?.length || 1))}%
                                </div>
                              </div>

                              {/* Advanced Metric 3: Consistency */}
                              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                <h4 className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Task Consistency
                                </h4>
                                <div className="flex items-center gap-3">
                                  <div className="relative w-12 h-12 flex items-center justify-center rounded-full border-4 border-emerald-100 dark:border-emerald-900/50">
                                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{match.assignmentConsistency || 0}%</span>
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                                    Assignments completed on time without mentor extensions.
                                  </div>
                                </div>
                              </div>

                              {/* Advanced Metric 4: Direct Feedback */}
                              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                <h4 className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                  <Activity className="w-4 h-4 text-blue-500" /> Mentor Evaluation
                                </h4>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs text-gray-500">Rating</span>
                                  <span className="text-sm font-bold text-gray-900 dark:text-white">⭐ {match.feedbackScore || "N/A"} / 5.0</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-500">Activity Level</span>
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${match.activityLevel === 'High' ? 'bg-emerald-100 text-emerald-700' : match.activityLevel === 'Low' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {match.activityLevel || 'Idle'}
                                  </span>
                                </div>
                              </div>

                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
