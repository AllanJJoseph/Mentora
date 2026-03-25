"use client";

import { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";

export default function FeedbackPrompt({ mentorName }: { mentorName: string }) {
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate an array from 0 to 10
  const scores = Array.from({ length: 11 }, (_, i) => i);

  // Simple logic to map the score to an aesthetic gradient color
  const getScoreColor = (score: number, active: boolean) => {
    if (!active) return "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600";
    if (score <= 4) return "bg-red-500 text-white border-red-600 dark:border-red-500 shadow-md shadow-red-500/20";
    if (score <= 7) return "bg-amber-500 text-white border-amber-600 dark:border-amber-500 shadow-md shadow-amber-500/20";
    return "bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500 shadow-md shadow-emerald-500/20";
  };

  if (isSubmitted) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 shadow-sm animate-fade-in flex items-center justify-center gap-3 w-full mb-8">
        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
        <h3 className="font-bold text-emerald-800 dark:text-emerald-400">Thank you! Your feedback helps {mentorName} improve.</h3>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6 mb-8 w-full animate-fade-in relative overflow-hidden">
      {/* Decorative gradient blur in background */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Star className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Session Feedback</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">How would you rate your recent session with <strong className="text-indigo-600 dark:text-indigo-400">{mentorName}</strong> on a scale from 0 to 10?</p>
        </div>
      </div>

      {/* The 0-10 Straight Line Grid - optimized to flex wrap neatly on mobile, but straight on desktop */}
      <div className="flex flex-wrap sm:flex-nowrap justify-between gap-2 max-w-4xl mx-auto mb-6">
        {scores.map(score => {
          const isActive = hoverScore !== null ? hoverScore >= score : selectedScore !== null ? selectedScore >= score : false;
          // By strictly checking equality vs greater-than, we can make the whole line light up, 
          // or just highlight the single chosen number. For NPS, highlighting the exact number is more standard.
          const isSelected = selectedScore === score;
          const isHovered = hoverScore === score;
          
          return (
            <button
              key={score}
              onMouseEnter={() => setHoverScore(score)}
              onMouseLeave={() => setHoverScore(null)}
              onClick={() => setSelectedScore(score)}
              className={`w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 md:flex-grow font-black text-sm md:text-lg rounded-full border-2 transition-all duration-200 ease-in-out transform hover:-translate-y-1 ${getScoreColor(score, isSelected || isHovered)}`}
            >
              {score}
            </button>
          )
        })}
      </div>

      <div className="flex justify-between max-w-4xl mx-auto mt-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2">
        <span>0 - Poor</span>
        <span>10 - Excellent</span>
      </div>

      {selectedScore !== null && (
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end animate-fade-in">
          <button 
            onClick={() => setIsSubmitted(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-sm"
          >
            Submit Feedback
          </button>
        </div>
      )}
    </div>
  );
}
