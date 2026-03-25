"use client";

import Navbar from "@/components/Navbar";
import BadgeCard from "@/components/BadgeCard";
import { MENTOR_BADGES, MENTEE_BADGES } from "@/utils/badges";
import { useAuth } from "@/context/AuthContext";
import { MOCK_MATCHES } from "@/utils/mockData";
import { useState } from "react";
import { Medal, Star } from "lucide-react";

export default function BadgeVault() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'mentee' | 'mentor'>('mentee');

  // Hardcoded active unlocked statuses for hackathon demo aesthetics
  const unlockedBadges = ["s_first", "s_homework", "s_consistency", "s_fast", "m_first", "m_time", "m_guiding_star"];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <header className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full mb-4">
            <Medal className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">The Badge Vault</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Discover all 30 progression achievements available on the Mentora platform. Log sessions, support your peers, and rank up to unlock them all.</p>
        </header>

        {/* Global Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-200 dark:bg-gray-800 p-1 rounded-xl shadow-inner">
            <button
              onClick={() => setActiveTab('mentee')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'mentee' ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
            >
              <Star className="w-4 h-4" /> Mentee Achievements
            </button>
            <button
              onClick={() => setActiveTab('mentor')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'mentor' ? 'bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
            >
              <Medal className="w-4 h-4" /> Mentor Achievements
            </button>
          </div>
        </div>

        {/* Dynamic Badge Grid rendering 15 unique SVG combinations */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-6 justify-items-center">
          {activeTab === 'mentee' && MENTEE_BADGES.map(badge => (
            <BadgeCard key={badge.id} badge={badge} isUnlocked={unlockedBadges.includes(badge.id)} size="md" />
          ))}
          {activeTab === 'mentor' && MENTOR_BADGES.map(badge => (
            <BadgeCard key={badge.id} badge={badge} isUnlocked={unlockedBadges.includes(badge.id)} size="md" />
          ))}
        </div>
        
      </div>
    </main>
  );
}
