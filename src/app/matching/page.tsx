"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { MatchingService } from "@/services/matchingService";
import { DATASET_MENTORS } from "@/utils/dataset";
import { useProfile } from "@/context/ProfileContext";
import { UserProfile } from "@/types";
import { Sparkles, Brain, Trophy, CheckCircle, Star, MapPin, Globe2, Clock, ArrowRight } from "lucide-react";

// Medal colors for top 3
const MEDAL_STYLES = [
  { ring: "ring-yellow-400", bg: "from-yellow-500/20 to-amber-500/10", border: "border-yellow-500/40", badge: "bg-yellow-500", label: "Best Match", icon: "🥇" },
  { ring: "ring-gray-300", bg: "from-gray-400/15 to-gray-500/5", border: "border-gray-400/30", badge: "bg-gray-400", label: "Great Fit", icon: "🥈" },
  { ring: "ring-orange-400", bg: "from-orange-500/15 to-amber-500/5", border: "border-orange-500/30", badge: "bg-orange-500", label: "Good Match", icon: "🥉" },
];

interface MatchResult {
  mentorId: string;
  score: number;
  explanation: string;
}

export default function MatchingPage() {
  const router = useRouter();
  const { profile, loading: profileLoading } = useProfile();
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (profileLoading || !profile) return;

    async function generateMatches() {
      setLoadingMatches(true);

      const activeUser: UserProfile = {
        uid: (profile as any).uid || (profile as any).id || "current-user",
        email: profile!.email || "",
        displayName: profile!.fullName || "You",
        role: (profile!.role as "mentor" | "mentee" | "admin") || "mentee",
        skills: profile!.skills || [],
        interests: profile!.interests || [],
        location: profile!.location || "",
        language: (profile as any).preferredLanguage || (profile as any).language || "English",
        availability: profile!.availability || "Weekends",
      };

      const results = await Promise.all(
        DATASET_MENTORS.map(async (rawMentor) => {
          const mentorProfile: UserProfile = {
            uid: rawMentor.id,
            email: rawMentor.email,
            displayName: rawMentor.name,
            role: "mentor",
            skills: rawMentor.skills,
            interests: rawMentor.interests,
            location: rawMentor.location,
            language: rawMentor.language,
            availability: rawMentor.availability || "Weekends",
            bio: rawMentor.bio,
          };
          return await MatchingService.createMatch(mentorProfile, activeUser);
        })
      );

      // Sort descending and take ONLY top 3
      setMatches(results.sort((a, b) => b.score - a.score).slice(0, 3));
      setLoadingMatches(false);
    }

    generateMatches();
  }, [profile, profileLoading]);

  const handleConfirm = async () => {
    if (!selectedMentorId) return;
    setConfirmed(true);

    const selectedMatch = matches.find(m => m.mentorId === selectedMentorId);
    const mentor = DATASET_MENTORS.find(m => m.id === selectedMentorId);

    if (mentor) {
      try {
        // Get current user's UID
        const uid = (profile as any)?.uid || (profile as any)?.id;
        if (uid) {
          const { doc, setDoc } = await import("firebase/firestore");
          const { db } = await import("@/lib/firebase");

          // Save selected mentor to the user's profile document
          const profileRef = doc(db, "profiles", uid);
          await setDoc(profileRef, {
            selectedMentor: {
              id: mentor.id,
              name: mentor.name,
              email: mentor.email,
              skills: mentor.skills,
              language: mentor.language,
              location: mentor.location,
              availability: mentor.availability,
              education: mentor.education,
              bio: mentor.bio,
              score: selectedMatch?.score || 0,
              explanation: selectedMatch?.explanation || "",
              selectedAt: new Date().toISOString(),
            },
          }, { merge: true });

          console.log("✅ Mentor saved to Firestore");
        }
      } catch (err) {
        console.warn("Failed to save mentor to Firestore:", err);
      }
    }

    setTimeout(() => router.push("/dashboard/mentee"), 2000);
  };

  const isLoading = profileLoading || loadingMatches;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 pt-24 selection:bg-indigo-500/30">
      <Navbar />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-500/20 rounded-2xl mb-5">
            <Brain className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            Your Top 3 Mentor Matches
          </h1>
          <p className="text-white/50 max-w-lg mx-auto">
            Our AI analyzed your skills, language, location, and availability against {DATASET_MENTORS.length} mentors. Here are your best matches.
          </p>
        </header>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
              <Brain className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-indigo-400 animate-pulse font-bold text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Analyzing {DATASET_MENTORS.length} mentors...
            </p>
            <p className="text-white/30 text-sm">Scoring skills · language · location · availability</p>
          </div>

        ) : !profile ? (
          <div className="py-20 text-center">
            <p className="text-white/60">Please log in to see your personalized matches.</p>
          </div>

        ) : confirmed ? (
          /* ─── Confirmation Screen ─── */
          <div className="flex flex-col items-center justify-center py-20 gap-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-black text-white">Mentor Selected! 🎉</h2>
            <p className="text-white/50">
              You chose <span className="text-indigo-400 font-bold">{DATASET_MENTORS.find(m => m.id === selectedMentorId)?.name}</span> as your mentor.
            </p>
            <p className="text-white/30 text-sm animate-pulse">Redirecting to your dashboard...</p>
          </div>

        ) : (
          /* ─── Top 3 Mentor Cards ─── */
          <>
            <div className="grid gap-6">
              {matches.map((match, i) => {
                const mentor = DATASET_MENTORS.find(m => m.id === match.mentorId)!;
                const style = MEDAL_STYLES[i];
                const isSelected = selectedMentorId === mentor.id;

                return (
                  <div
                    key={mentor.id}
                    onClick={() => setSelectedMentorId(mentor.id)}
                    className={`
                      relative cursor-pointer rounded-2xl border-2 p-6 md:p-8 transition-all duration-300
                      bg-gradient-to-br ${style.bg}
                      ${isSelected
                        ? `${style.border} ring-2 ${style.ring} shadow-2xl scale-[1.01]`
                        : "border-white/10 hover:border-white/20 hover:shadow-lg"
                      }
                    `}
                  >
                    {/* Medal Badge */}
                    <div className="absolute -top-3 -left-2">
                      <span className="text-3xl">{style.icon}</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Left: Avatar + Score */}
                      <div className="flex flex-col items-center gap-3 flex-shrink-0">
                        {/* Score Circle */}
                        <div className="relative w-24 h-24">
                          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                            <path className="text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                            <path className={`${i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : "text-orange-400"}`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${match.score}, 100`} strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-black text-white">{match.score}%</span>
                            <span className="text-[8px] font-bold text-white/40 uppercase">Match</span>
                          </div>
                        </div>

                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white rounded-full ${style.badge}`}>
                          {style.label}
                        </span>
                      </div>

                      {/* Right: Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="text-xl md:text-2xl font-black text-white">{mentor.name}</h3>
                            <p className="text-white/40 text-sm mt-0.5">{mentor.education} • {mentor.age} years old</p>
                          </div>
                          {isSelected && (
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center animate-bounce">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-3 mb-4 text-xs">
                          <span className="flex items-center gap-1 text-white/50">
                            <MapPin className="w-3.5 h-3.5" /> {mentor.location}
                          </span>
                          <span className="flex items-center gap-1 text-white/50">
                            <Globe2 className="w-3.5 h-3.5" /> {mentor.language}
                          </span>
                          <span className="flex items-center gap-1 text-white/50">
                            <Clock className="w-3.5 h-3.5" /> {mentor.availability}
                          </span>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {mentor.skills.map((skill) => (
                            <span key={skill} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-semibold text-white/70">
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* AI Explanation */}
                        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                          <span className="text-indigo-400 font-bold text-xs flex items-center gap-1 mb-1">
                            <Sparkles className="w-3.5 h-3.5" /> AI Insight
                          </span>
                          <p className="text-white/70 text-sm leading-relaxed">{match.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ─── Confirm Selection Button ─── */}
            <div className="mt-10 flex flex-col items-center gap-4">
              {selectedMentorId ? (
                <button
                  onClick={handleConfirm}
                  className="px-10 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/25 transition-all text-lg flex items-center gap-3 active:scale-[0.97]"
                >
                  <CheckCircle className="w-5 h-5" />
                  Confirm — Choose {DATASET_MENTORS.find(m => m.id === selectedMentorId)?.name}
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <p className="text-white/30 text-sm animate-pulse flex items-center gap-2">
                  <Star className="w-4 h-4" /> Tap on a mentor card above to select them
                </p>
              )}
            </div>

            {/* Scoring Footer */}
            <footer className="mt-12 p-5 bg-white/5 border border-white/10 rounded-2xl text-sm text-white/30">
              <p><strong className="text-white/50">Scoring Logic:</strong> (Skills × 0.4) + (Language × 0.2) + (Location × 0.2) + (Availability × 0.2)</p>
              <p className="mt-1.5">Explanations generated by <span className="text-indigo-400">Gemini 1.5 Flash</span>.</p>
            </footer>
          </>
        )}
      </div>
    </main>
  );
}
