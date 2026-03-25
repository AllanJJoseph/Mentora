"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight flex items-center gap-2">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.3"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Mentora
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            About
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Dashboard
          </Link>

          {user ? (
            <>
              <Link href="/settings" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Settings
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                  {(user.displayName || "U").charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 font-medium">{user.displayName || "User"}</span>
              </div>
            </>
          ) : (
            <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
