"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { MOCK_MENTEE, MOCK_MATCHES, MOCK_MENTORS } from "@/utils/mockData";
import HealthBadge from "@/components/HealthBadge";
import MatchCard from "@/components/MatchCard";
import SessionAssistant from "@/components/SessionAssistant";
import ChatInterface from "@/components/ChatInterface";
import { Flame, Trophy, Calendar, MessageSquare, BarChart3, Settings } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "sessions" | "chat">("overview");

  const activeMatch = MOCK_MATCHES.find(m => m.id === "match_active");
  const mentor = MOCK_MENTORS.find(m => m.uid === activeMatch?.mentorId);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {MOCK_MENTEE.displayName}
          </h1>
          <p className="text-gray-600">Track your mentorship journey and stay connected</p>
        </header>

        {/* Tab Navigation */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-200">
          {(["overview", "sessions", "chat"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize transition-all border-b-2 ${
                activeTab === tab
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-sm text-gray-500 font-medium">Streak</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{activeMatch?.streakCount || 0}</div>
                  <p className="text-xs text-gray-500 mt-1">weeks in a row</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-gray-500 font-medium">Rank</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">#3</div>
                  <p className="text-xs text-gray-500 mt-1">this month</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-500 font-medium">Sessions</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{activeMatch?.streakCount || 0}</div>
                  <p className="text-xs text-gray-500 mt-1">completed</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-500 font-medium">Health</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{activeMatch?.engagementScore || 0}%</div>
                  <p className="text-xs text-gray-500 mt-1">engagement</p>
                </div>
              </div>

              {/* Active Mentor */}
              <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Your Mentor</h2>
                  {activeMatch && <HealthBadge status={activeMatch.healthStatus} score={activeMatch.engagementScore} />}
                </div>
                {activeMatch && mentor ? (
                  <MatchCard mentor={mentor} score={activeMatch.score} explanation={activeMatch.explanation} />
                ) : (
                  <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-lg">
                    <p className="text-gray-500 mb-4">No active match found. Visit the matching portal to find a mentor!</p>
                    <a href="/matching-demo" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                      Find a Mentor
                    </a>
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Feature Demos</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { href: "/matching-demo", label: "AI Matching Engine" },
                    { href: "/health-demo", label: "Health Tracker" },
                    { href: "/session-demo", label: "AI Session Assistant" },
                    { href: "/leaderboard-demo", label: "Gamification" },
                    { href: "/language-demo", label: "Language Bridge" }
                  ].map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      className="flex justify-between items-center p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                    >
                      <span className="text-sm font-medium text-gray-700">{i + 1}. {link.label}</span>
                      <span className="text-blue-600">→</span>
                    </a>
                  ))}

                  <a
                    href="/admin"
                    className="flex justify-between items-center p-3 mt-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                  >
                    <span className="text-sm font-bold text-blue-700">Admin Dashboard</span>
                    <span className="text-blue-700">→</span>
                  </a>
                </div>
              </div>

              {/* Quick Settings */}
              <div className="bg-blue-600 rounded-xl shadow-sm p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Settings className="w-5 h-5" />
                  <h3 className="font-bold">Customize Your Experience</h3>
                </div>
                <p className="text-sm text-blue-100 mb-4">
                  Update your profile, preferences, and notification settings.
                </p>
                <a href="/settings" className="inline-block bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                  Go to Settings
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              <SessionAssistant />
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700 text-sm font-semibold mb-1">
                <MessageSquare className="w-4 h-4" />
                Language Bridge
              </div>
              <p className="text-sm text-blue-600">
                This chat automatically detects and translates messages if your mentor speaks a different language.
              </p>
            </div>
            <ChatInterface />
          </div>
        )}
      </div>
    </main>
  );
}
