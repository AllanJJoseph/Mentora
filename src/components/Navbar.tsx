"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { useSchedule } from "@/context/ScheduleContext";
import { useEffect, useState } from "react";
import { Moon, Sun, Bell } from "lucide-react";

export default function Navbar() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const displayName = profile?.fullName || user?.displayName || "User";
  const { notifications, markNotificationsRead } = useSchedule();
  const [isDark, setIsDark] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter notifications meant for this user (default to mentee_1 if browsing without logging in)
  const targetId = user?.uid || "mentee_1";
  const myNotifications = notifications.filter(n => n.userId === targetId);
  const unreadCount = myNotifications.filter(n => !n.read).length;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const stored = localStorage.getItem('mentora-theme');
      if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mentora-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mentora-theme', 'light');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight flex items-center gap-2">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.3"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Mentora
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          <button 
            onClick={toggleTheme} 
            className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors hidden sm:block">
            About
          </Link>
          <Link href="/dashboard/mentee" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors hidden sm:block">
            Dashboard
          </Link>
          <Link href="/chat" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors hidden sm:block">
            Chat
          </Link>
          <Link href="/sessions" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors hidden sm:block">
            Sessions
          </Link>
          <Link href="/badges" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors hidden sm:block">
            Badges
          </Link>
          <Link href="/matching" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors hidden sm:block">
            Find Mentor
          </Link>
          <Link href="/leaderboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors hidden sm:block">
            Leaderboard
          </Link>
          <Link href="/peer-to-peer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors hidden sm:block">
            Peer Tutoring
          </Link>

          {/* Global Notification Bell (Visible during Hackathon Demo regardless of login state) */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowDropdown(!showDropdown);
                if (!showDropdown && unreadCount > 0) markNotificationsRead(targetId);
              }}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900 shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown Box */}
            {showDropdown && (
              <div className="absolute top-12 right-0 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden animate-fade-in z-50">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                  <h4 className="font-bold text-gray-900 dark:text-white">Mentee Alerts</h4>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {myNotifications.length === 0 ? (
                    <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                      No new notifications.
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                      {myNotifications.map(n => (
                        <Link href={n.link || "#"} key={n.id} onClick={() => setShowDropdown(false)}>
                          <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{n.message}</p>
                            <span className="text-xs text-indigo-500 mt-1 block tracking-wide font-semibold">{n.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {user ? (
            <>
              <Link href="/settings" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors hidden sm:block">
                Settings
              </Link>
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => (window as any).location.href = '/login'}>
                <div className="w-9 h-9 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm ring-2 ring-indigo-100 dark:ring-indigo-900/50">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 dark:text-gray-200 font-medium hidden sm:block">{displayName}</span>
              </div>
            </>
          ) : (
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
