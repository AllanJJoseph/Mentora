"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";
import { DATASET_MENTORS } from "@/utils/dataset";
import { FileText, Calendar, Clock, User, Download, BookOpen, CheckCircle, Sparkles, Mic } from "lucide-react";

// ─── Session Data Type ───
interface SessionSummary {
  id: string;
  sessionName: string;
  mentorName: string;
  date: string;
  duration: string;
  meetLink: string;
  summary: string;
  keyTakeaways: string[];
  actionItems: string[];
  saved: boolean;
}

// ─── Completed Sessions (using dataset mentor names) ───
const MOCK_SESSIONS: SessionSummary[] = [
  {
    id: "session_1",
    sessionName: "Introduction to React Hooks",
    mentorName: DATASET_MENTORS[0]?.name || "Mentor",
    date: "March 25, 2026",
    duration: "45 min",
    meetLink: "https://meet.google.com/abc-defg-hij",
    summary: "This session covered the fundamentals of React Hooks, focusing primarily on useState and useEffect. Sarah explained the mental model behind state management in functional components, contrasting it with the older class-based approach. We worked through several practical examples including building a counter, a todo list, and a data fetching pattern. The session concluded with a brief introduction to custom hooks and how they promote code reusability across components.",
    keyTakeaways: [
      "useState replaces this.setState in functional components",
      "useEffect handles side effects like API calls and subscriptions",
      "Custom hooks let you extract and share stateful logic",
      "Always include dependencies in the useEffect dependency array",
    ],
    actionItems: [
      "Build a weather app using useState and useEffect",
      "Read the React docs on custom hooks",
      "Practice converting one class component to hooks",
    ],
    saved: true,
  },
  {
    id: "session_2",
    sessionName: "Database Design Fundamentals",
    mentorName: "Rajesh Kumar",
    date: "March 23, 2026",
    duration: "60 min",
    meetLink: "https://meet.google.com/xyz-mnop-qrs",
    summary: "Rajesh walked through the principles of relational database design, starting with entity-relationship diagrams and normalization up to 3NF. We discussed practical trade-offs between normalized and denormalized schemas for different use cases. The session included a hands-on exercise designing a schema for a library management system, covering tables for books, authors, members, and loans with proper foreign key relationships.",
    keyTakeaways: [
      "Normalization reduces data redundancy but can impact query performance",
      "Foreign keys enforce referential integrity between tables",
      "Indexes significantly speed up read queries but slow down writes",
      "Always consider your query patterns when designing schemas",
    ],
    actionItems: [
      "Design a database schema for an e-commerce platform",
      "Practice writing JOIN queries on the library schema",
      "Research when to use NoSQL vs SQL databases",
    ],
    saved: true,
  },
  {
    id: "session_3",
    sessionName: "Python Data Analysis with Pandas",
    mentorName: "Maria Santos",
    date: "March 21, 2026",
    duration: "50 min",
    meetLink: "https://meet.google.com/tuv-wxyz-abc",
    summary: "Maria introduced the Pandas library for data manipulation and analysis in Python. We covered DataFrame creation from CSV files and dictionaries, data selection with loc and iloc, filtering, groupby operations, and basic data visualization using matplotlib integration. The session ended with a real-world exercise analyzing a sales dataset to find top-performing products and seasonal trends.",
    keyTakeaways: [
      "DataFrames are the core data structure in Pandas",
      "Use .loc for label-based indexing and .iloc for position-based",
      "GroupBy operations are powerful for aggregating data by categories",
      "Always clean missing data before analysis using fillna() or dropna()",
    ],
    actionItems: [
      "Complete the Kaggle Pandas exercises",
      "Analyze a public dataset of your choice and present findings",
      "Learn about merge and concat operations for combining DataFrames",
    ],
    saved: false,
  },
  {
    id: "session_4",
    sessionName: "UI/UX Design Principles",
    mentorName: "Anil Nair",
    date: "March 19, 2026",
    duration: "40 min",
    meetLink: "https://meet.google.com/def-ghij-klm",
    summary: "Anil covered the core principles of UI/UX design including visual hierarchy, color theory, typography pairing, and responsive layout strategies. We reviewed several real-world app designs and discussed what makes them effective. The session included a practical exercise redesigning a login page following modern design principles with emphasis on accessibility and mobile-first approach.",
    keyTakeaways: [
      "Visual hierarchy guides the user's eye through the interface",
      "Limit your color palette to 2-3 primary colors with shades",
      "Typography should have contrast between headings and body text",
      "Always design mobile-first, then scale up to desktop",
    ],
    actionItems: [
      "Redesign one screen of your current project using these principles",
      "Study 3 award-winning app designs on Dribbble",
      "Learn Figma basics for prototyping",
    ],
    saved: false,
  },
];

export default function SessionsPage() {
  const [sessions, setSessions] = useState<SessionSummary[]>(MOCK_SESSIONS);
  const [expandedId, setExpandedId] = useState<string | null>("session_3");

  const handleSave = (sessionId: string) => {
    setSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, saved: true } : s))
    );
  };

  const handleDownload = (session: SessionSummary) => {
    const content = `
SESSION SUMMARY
===============
${session.sessionName}
Mentor: ${session.mentorName}
Date: ${session.date}
Duration: ${session.duration}

SUMMARY
-------
${session.summary}

KEY TAKEAWAYS
-------------
${session.keyTakeaways.map((t, i) => `${i + 1}. ${t}`).join("\n")}

ACTION ITEMS
------------
${session.actionItems.map((a, i) => `${i + 1}. ${a}`).join("\n")}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${session.sessionName.replace(/\s+/g, "_")}_${session.date.replace(/,?\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-24">
        <header className="mb-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-100 dark:bg-purple-900/40 rounded-xl">
                <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Session Notes</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">AI-generated summaries of your completed mentorship sessions</p>
              </div>
            </div>
            <Link href="/sessions/record" className="flex items-center gap-2 px-5 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95">
              <Mic className="w-4 h-4" />
              Record New Session
            </Link>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
              {sessions.filter(s => s.saved).length} Saved
            </span>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full">
              {sessions.filter(s => !s.saved).length} Unsaved
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold rounded-full">
              {sessions.length} Total Sessions
            </span>
          </div>
        </header>

        {/* Sessions List */}
        <div className="space-y-4">
          {sessions.map((session) => {
            const isExpanded = expandedId === session.id;

            return (
              <div
                key={session.id}
                className={`bg-white dark:bg-gray-800 rounded-2xl border shadow-sm overflow-hidden transition-all duration-300 ${
                  session.saved
                    ? "border-green-200 dark:border-green-800/50"
                    : "border-amber-200 dark:border-amber-800/50"
                } ${isExpanded ? "shadow-lg" : "hover:shadow-md"}`}
              >
                {/* Session Header (always visible) */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : session.id)}
                  className="w-full text-left p-5 flex items-center gap-4"
                >
                  {/* Status Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    session.saved
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                      : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                  }`}>
                    {session.saved ? <CheckCircle className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base truncate">{session.sessionName}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {session.mentorName}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {session.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.duration}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {session.saved ? (
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        ✓ Saved
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold rounded-full uppercase tracking-wider animate-pulse">
                        New — Review
                      </span>
                    )}
                    <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-5 pb-6 border-t border-gray-100 dark:border-gray-700 animate-fade-in">

                    {/* AI Summary */}
                    <div className="mt-5 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/40">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">AI-Generated Summary</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {session.summary}
                      </p>
                    </div>

                    {/* Key Takeaways */}
                    <div className="mt-4">
                      <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">📌 Key Takeaways</h4>
                      <ul className="space-y-2">
                        {session.keyTakeaways.map((takeaway, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            {takeaway}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Items */}
                    <div className="mt-4">
                      <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">📋 Action Items</h4>
                      <ul className="space-y-2">
                        {session.actionItems.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <input type="checkbox" className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                      {!session.saved && (
                        <button
                          onClick={() => handleSave(session.id)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Save Summary
                        </button>
                      )}
                      <button
                        onClick={() => handleDownload(session)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-bold rounded-xl transition-all"
                      >
                        <Download className="w-4 h-4" />
                        Download as TXT
                      </button>
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
