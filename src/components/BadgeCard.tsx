"use client";

import { BadgeDef } from "@/utils/badges";
import * as LucideIcons from "lucide-react";
import React from "react";

export default function BadgeCard({ badge, isUnlocked = false, size = 'md' }: { badge: BadgeDef, isUnlocked?: boolean, size?: 'sm' | 'md' | 'lg' }) {
  
  // TAILWIND SAFELIST INJECTION (Hackathon Demo Override to bypass dev server restart)
  // from-sky-400 to-blue-500 from-blue-600 to-sky-600 shadow-blue-500/40
  // from-rose-400 to-red-500 from-red-600 to-rose-600 shadow-red-500/40
  // from-teal-400 to-emerald-500 from-emerald-600 to-teal-600 shadow-teal-500/40
  // from-violet-400 to-purple-500 from-purple-600 to-violet-600 shadow-violet-500/40
  // from-amber-300 to-orange-400 from-orange-500 to-amber-600 shadow-orange-500/40
  // from-cyan-400 to-indigo-500 from-indigo-600 to-cyan-600 shadow-indigo-500/40
  // from-fuchsia-400 to-pink-500 from-pink-600 to-fuchsia-600 shadow-pink-500/40
  // from-lime-400 to-green-500 from-green-600 to-lime-600 shadow-green-500/40
  // from-blue-400 to-indigo-600 from-indigo-700 to-blue-700 shadow-indigo-500/40
  // from-orange-400 to-red-500 from-red-600 to-orange-700 shadow-red-500/40
  // from-emerald-400 to-cyan-500 from-cyan-600 to-emerald-600 shadow-cyan-500/40
  // from-yellow-300 to-yellow-500 from-yellow-600 shadow-yellow-500/40
  // from-purple-400 to-fuchsia-600 from-fuchsia-700 to-purple-600 shadow-fuchsia-500/40
  // from-red-500 to-rose-600 from-rose-700 to-red-700 shadow-rose-500/40
  // from-yellow-400 via-amber-500 to-orange-500 from-orange-600 to-amber-700 shadow-orange-500/50
  
  // from-blue-300 from-blue-500
  // from-emerald-300 from-emerald-500 shadow-emerald-500/40
  // from-violet-300 from-violet-500 
  // from-pink-400 to-rose-500 from-rose-600 to-pink-600 shadow-pink-500/40
  // from-amber-400 to-yellow-500 from-yellow-600 to-amber-600 shadow-yellow-500/40
  // from-rose-500 to-orange-500 from-orange-600 to-rose-700 shadow-orange-500/40
  // from-cyan-500 to-blue-600 from-blue-700 to-cyan-700 shadow-blue-500/40
  // from-indigo-400 to-purple-600 from-purple-700 to-indigo-700 shadow-purple-500/40
  // from-lime-500 to-emerald-600 from-emerald-700 to-lime-700 shadow-lime-500/40
  // from-yellow-400 to-orange-500 from-orange-600 to-yellow-600 shadow-orange-500/40
  // from-fuchsia-500 to-purple-600 from-purple-700 to-fuchsia-700 shadow-fuchsia-500/40
  // from-yellow-300 via-yellow-400 to-amber-400 from-amber-600 to-yellow-600 shadow-yellow-500/40
  // from-teal-400 to-cyan-500 from-cyan-600 to-teal-600 shadow-teal-500/40
  // from-red-500 via-orange-500 to-yellow-500 from-orange-700 to-red-700 shadow-red-500/50
  // from-purple-500 to-indigo-600 from-indigo-800 to-purple-800 shadow-purple-500/50

  
  // Resolve the Lucide Icon mathematically
  const IconComponent = (LucideIcons as any)[badge.iconRef] || LucideIcons.Award;

  let coreStyles = {
    iconBox: `bg-gradient-to-br ${badge.bgGrad} text-white shadow-xl ${badge.shadow}`,
    ribbon: `bg-gradient-to-r ${badge.ribbonGrad} text-white`,
    wrapper: "",
    glow: ""
  };

  if (isUnlocked) {
    // Unlocked: Green background for ALL combinations
    coreStyles.wrapper = "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/30 border-green-300 dark:border-emerald-600 shadow-green-500/20";
    coreStyles.glow = "bg-green-400/30 animate-pulse";
  } else {
    // Locked: No background (transparent wrapper), but the core badge remains colorful
    coreStyles.wrapper = "bg-transparent border-transparent dark:border-transparent opacity-90 transition-opacity hover:opacity-100";
    coreStyles.glow = "hidden";
  }

  const styles = coreStyles;

  // Sizing math
  const szMap = {
    sm: { box: "w-20 h-24", iconBox: "w-10 h-10", icon: "w-5 h-5", text: "text-[9px]", padding: "p-2", ribbonY: "-bottom-2" },
    md: { box: "w-32 h-40", iconBox: "w-16 h-16", icon: "w-8 h-8", text: "text-xs", padding: "p-4", ribbonY: "-bottom-3" },
    lg: { box: "w-48 h-56", iconBox: "w-24 h-24", icon: "w-12 h-12", text: "text-base", padding: "p-6", ribbonY: "-bottom-4" }
  };
  const sz = szMap[size];

  return (
    <div 
      className="relative group transition-all duration-300 hover:scale-105"
      title={isUnlocked ? `${badge.name}\n${badge.description}` : `LOCKED: ${badge.name}\n${badge.description}`}
    >
      {/* Dynamic Glow Layer */}
      {isUnlocked && (
        <div className={`absolute inset-0 rounded-2xl blur-xl transition-all opacity-0 group-hover:opacity-100 ${styles.glow}`} />
      )}
      
      {/* Base Badge Card Container */}
      <div className={`relative flex flex-col items-center justify-center text-center rounded-2xl border-2 shadow-lg backdrop-blur-sm ${styles.wrapper} ${sz.box} ${sz.padding}`}>
        
        {/* Core Mathematical Icon Circle */}
        <div className={`rounded-full flex items-center justify-center mb-2 z-10 transition-transform duration-500 group-hover:rotate-12 ${styles.iconBox} ${sz.iconBox}`}>
          <IconComponent className={`${sz.icon} ${isUnlocked ? 'animate-pulse' : ''}`} />
        </div>

        {/* Name (hidden partially by ribbon at bottom, visually distinct) */}
        {!isUnlocked && (
           <div className="absolute top-2 right-2 flex items-center justify-center">
             <LucideIcons.Lock className="w-4 h-4 text-gray-400 dark:text-gray-500 opacity-50" />
           </div>
        )}

        {/* Decorative Graphic Ribbon mathematically positioned at bottom center */}
        <div className={`absolute ${sz.ribbonY} left-1/2 -translate-x-1/2 rounded-md shadow-lg flex items-center justify-center font-black tracking-wider uppercase z-20 whitespace-nowrap px-3 py-1 ${styles.ribbon}`}>
           <span className={`${sz.text}`}>
             {badge.name}
           </span>
           {/* Ribbon Tails (CSS Triangles trick) */}
           <div className={`absolute top-0 -left-1 w-2 h-full ${styles.ribbon} filter brightness-75 -z-10 skew-y-12`}></div>
           <div className={`absolute top-0 -right-1 w-2 h-full ${styles.ribbon} filter brightness-75 -z-10 -skew-y-12`}></div>
        </div>
      </div>
    </div>
  );
}
