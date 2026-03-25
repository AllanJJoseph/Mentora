"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Star, Trophy, TrendingUp, MessageCircle, CheckCircle, Award, GraduationCap, ChevronDown, ChevronUp } from "lucide-react";
import { DATASET_MENTEES } from "@/utils/dataset";

// ─── Peer Tutor Data (generated from real dataset) ───
interface PeerTutor {
  id: string;
  name: string;
  avatar: string;
  color: string;
  subjects: string[];
  avgScore: number;
  testsTaken: number;
  topScores: { subject: string; score: number; maxScore: number }[];
  rank: number;
  sessionsCompleted: number;
  rating: number;
  online: boolean;
  bio: string;
  connected: boolean;
}

const GRADIENT_COLORS = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
];

// Build peer tutors from the top-performing mentees in the CSV dataset
const PEER_TUTORS: PeerTutor[] = DATASET_MENTEES.slice(0, 5).map((m, i) => ({
  id: `peer_${i}`,
  name: m.name,
  avatar: m.name.charAt(0),
  color: GRADIENT_COLORS[i % GRADIENT_COLORS.length],
  subjects: m.skills,
  avgScore: 94 - i * 2, // Simulated high scores (94, 92, 90, 88, 86)
  testsTaken: 15 - i * 2,
  topScores: m.skills.map((skill, j) => ({
    subject: skill,
    score: 98 - i * 2 - j * 3,
    maxScore: 100,
  })),
  rank: i + 1,
  sessionsCompleted: 10 - i * 2,
  rating: parseFloat((4.9 - i * 0.1).toFixed(1)),
  online: i % 2 === 0,
  bio: `${m.education} student from ${m.location}. Speaks ${m.language}. Interested in ${m.interests.join(" & ")}.`,
  connected: false,
}));

const ELIGIBILITY_THRESHOLD = 85;

export default function PeerToPeerPage() {
  const [tutors, setTutors] = useState<PeerTutor[]>(PEER_TUTORS);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const router = useRouter();

  const handleConnect = (tutorId: string) => {
    setTutors(prev => prev.map(t => (t.id === tutorId ? { ...t, connected: true } : t)));
    // Navigate to chat after a brief delay
    setTimeout(() => router.push("/chat"), 500);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-24">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-teal-100 dark:bg-teal-900/40 rounded-xl">
              <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Peer-to-Peer Tutoring</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Learn from top-performing mentees who scored {ELIGIBILITY_THRESHOLD}%+ on their tests</p>
            </div>
          </div>

          {/* Stats badges */}
          <div className="flex items-center gap-3 mt-4">
            <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-xs font-bold rounded-full">
              {tutors.filter(t => t.online).length} Online Now
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold rounded-full">
              {tutors.length} Peer Tutors Available
            </span>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full flex items-center gap-1">
              <Award className="w-3 h-3" /> Min {ELIGIBILITY_THRESHOLD}% Avg Score Required
            </span>
          </div>
        </header>

        {/* ─── Peer Tutor Cards ─── */}
        <div className="space-y-4">
          {tutors.map((tutor) => {
            const isExpanded = expandedId === tutor.id;

            return (
              <div key={tutor.id} className={`bg-white dark:bg-gray-800 rounded-2xl border shadow-sm overflow-hidden transition-all duration-300 ${isExpanded ? "shadow-lg border-teal-300 dark:border-teal-700" : "border-gray-200 dark:border-gray-700 hover:shadow-md"}`}>

                {/* Card Header — Always Visible */}
                <button onClick={() => setExpandedId(isExpanded ? null : tutor.id)} className="w-full text-left p-5">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tutor.color} flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                        {tutor.avatar}
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-800 ${tutor.online ? "bg-green-500" : "bg-gray-400"}`}>
                        {tutor.online && <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{tutor.name}</h3>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                          <GraduationCap className="w-3 h-3" /> Peer Tutor
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Rank #{tutor.rank}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tutor.bio}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {tutor.rating}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{tutor.testsTaken} tests taken</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{tutor.sessionsCompleted} sessions tutored</span>
                        <span className={`text-xs font-bold ${tutor.online ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}>
                          {tutor.online ? "🟢 Online" : "⚫ Offline"}
                        </span>
                      </div>
                    </div>

                    {/* Score + Expand */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      {/* Score Circle */}
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                          <path className="text-gray-200 dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                          <path className="text-teal-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${tutor.avgScore}, 100`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-sm font-black text-gray-900 dark:text-white">{tutor.avgScore}%</span>
                          <span className="text-[8px] font-bold text-gray-400 uppercase">Avg</span>
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>

                  {/* Subject Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {tutor.subjects.map((subject) => (
                      <span key={subject} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300">
                        {subject}
                      </span>
                    ))}
                  </div>
                </button>

                {/* ─── Expanded Detail Panel ─── */}
                {isExpanded && (
                  <div className="px-5 pb-6 border-t border-gray-100 dark:border-gray-700">

                    {/* Score Breakdown */}
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {tutor.topScores.map((test, i) => (
                        <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              {i === 0 && <Trophy className="w-3 h-3 text-amber-500" />}
                              {test.subject}
                            </span>
                            <span className={`text-lg font-black ${test.score >= 95 ? "text-emerald-600 dark:text-emerald-400" : test.score >= 90 ? "text-blue-600 dark:text-blue-400" : "text-indigo-600 dark:text-indigo-400"}`}>
                              {test.score}
                              <span className="text-xs text-gray-400 font-normal">/{test.maxScore}</span>
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-700 ${test.score >= 95 ? "bg-emerald-500" : test.score >= 90 ? "bg-blue-500" : "bg-indigo-500"}`}
                              style={{ width: `${(test.score / test.maxScore) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Eligibility Bar */}
                    <div className="mt-4 p-4 bg-teal-50 dark:bg-teal-900/15 rounded-xl border border-teal-100 dark:border-teal-800/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" /> Eligibility Score
                        </span>
                        <span className="text-sm font-black text-teal-700 dark:text-teal-400">{tutor.avgScore}% / {ELIGIBILITY_THRESHOLD}% min</span>
                      </div>
                      <div className="w-full bg-teal-100 dark:bg-teal-900/40 rounded-full h-2.5 relative">
                        <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: `${tutor.avgScore}%` }}></div>
                        {/* Threshold marker */}
                        <div className="absolute top-0 h-2.5 border-l-2 border-dashed border-teal-700 dark:border-teal-300" style={{ left: `${ELIGIBILITY_THRESHOLD}%` }}></div>
                      </div>
                      <p className="text-[10px] text-teal-600 dark:text-teal-500 mt-1.5">Based on {tutor.testsTaken} tests • Exceeds minimum by {tutor.avgScore - ELIGIBILITY_THRESHOLD}%</p>
                    </div>

                    {/* Action Row */}
                    <div className="mt-5 flex items-center gap-3">
                      {tutor.connected ? (
                        <div className="flex items-center gap-2 px-5 py-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl border border-green-200 dark:border-green-800/40 font-bold text-sm">
                          <CheckCircle className="w-4 h-4" /> Connected — Check your Chat
                        </div>
                      ) : (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleConnect(tutor.id); }}
                          disabled={!tutor.online}
                          className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white disabled:text-gray-500 font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] text-sm"
                        >
                          <MessageCircle className="w-4 h-4" />
                          {tutor.online ? "Connect with Peer Tutor" : "Offline — Check Back Later"}
                        </button>
                      )}
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 flex-1">
                        ⚠️ Peer tutors are fellow mentees, not professional mentors.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
