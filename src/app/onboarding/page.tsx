"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfile, OnboardingProfile } from "@/context/ProfileContext";
import { User, GraduationCap, BookOpen, Globe, Clock, Target, ChevronRight, ChevronLeft, CheckCircle, Sparkles } from "lucide-react";

const SKILL_OPTIONS = [
  "React", "JavaScript", "TypeScript", "Python", "Java", "C++", "SQL", "MongoDB",
  "Machine Learning", "Data Science", "UI/UX Design", "Mobile Development",
  "Cloud Computing", "Cybersecurity", "DevOps", "System Design", "DSA",
  "HTML/CSS", "Node.js", "Flutter", "Figma", "Statistics",
];

const INTEREST_OPTIONS = [
  "Web Development", "Mobile Apps", "AI/ML", "Data Analytics", "Game Development",
  "Blockchain", "IoT", "AR/VR", "Cloud Architecture", "Open Source",
  "Competitive Programming", "Research", "Startup Building", "Freelancing",
];

const LANGUAGE_OPTIONS = [
  "English", "Malayalam", "Tamil", "Hindi", "Telugu", "Kannada",
  "Spanish", "French", "Arabic", "Portuguese", "German",
];

const AVAILABILITY_OPTIONS = [
  "Weekday mornings (8 AM - 12 PM)",
  "Weekday afternoons (12 PM - 5 PM)",
  "Weekday evenings (5 PM - 9 PM)",
  "Weekend mornings (8 AM - 12 PM)",
  "Weekend afternoons (12 PM - 5 PM)",
  "Weekend evenings (5 PM - 9 PM)",
  "Flexible / Any time",
];

const EDUCATION_OPTIONS = [
  "High School", "Undergraduate (1st Year)", "Undergraduate (2nd Year)",
  "Undergraduate (3rd Year)", "Undergraduate (4th Year)", "Postgraduate",
  "Working Professional", "Self-taught / Bootcamp",
];

export default function OnboardingPage() {
  const router = useRouter();
  const { saveProfile, isOnboarded, profile, loading } = useProfile();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // ─── AUTO-REDIRECT if already onboarded ───
  useEffect(() => {
    if (!loading && isOnboarded && profile) {
      const role = profile.role || "mentee";
      router.replace(role === "mentor" ? "/dashboard/mentor" : "/dashboard/mentee");
    }
  }, [loading, isOnboarded, profile, router]);

  // Form state
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"mentor" | "mentee" | "">("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("English");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [availability, setAvailability] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [goals, setGoals] = useState("");

  const toggleItem = (item: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const canProceed = () => {
    if (step === 1) return fullName.trim() && role && email.trim() && phone.trim() && age.trim();
    if (step === 2) return skills.length >= 2 && interests.length >= 1;
    if (step === 3) return preferredLanguage && availability && educationLevel;
    if (step === 4) return bio.trim() && goals.trim();
    return false;
  };

  const handleSubmit = () => {
    const profile: OnboardingProfile = {
      fullName, role: role as "mentor" | "mentee", email, phone, age, location,
      preferredLanguage, bio, skills, interests, availability, educationLevel, goals,
      completedAt: new Date().toISOString(),
    };
    saveProfile(profile);

    // Route based on role
    if (role === "mentor") router.push("/dashboard/mentor");
    else router.push("/dashboard/mentee");
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Welcome to Mentora</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Complete your profile to get started. This helps us match you with the right mentors.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-8">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="flex-1 flex items-center gap-2">
              <div className={`flex-1 h-2 rounded-full transition-all duration-500 ${i + 1 <= step ? "bg-indigo-500" : "bg-gray-200 dark:bg-gray-700"}`}></div>
            </div>
          ))}
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-2">{step}/{totalSteps}</span>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-8">

          {/* ─── STEP 1: Personal Info ─── */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h2>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">I am a *</label>
                <div className="grid grid-cols-2 gap-3">
                  {(["mentee", "mentor"] as const).map(r => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        role === r
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {r === "mentee" ? <BookOpen className="w-5 h-5 text-indigo-500" /> : <GraduationCap className="w-5 h-5 text-teal-500" />}
                        <span className="font-bold text-gray-900 dark:text-white capitalize">{r}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {r === "mentee" ? "I want to learn and be mentored" : "I want to guide and teach others"}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Allan Joe"
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Age *</label>
                  <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="20" min="13" max="100"
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Email *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="allan@example.com"
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Phone Number *</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 79940 93409"
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Location</label>
                  <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Kerala, India"
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 2: Skills & Interests ─── */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Skills & Interests</h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  {role === "mentor" ? "Skills I can teach" : "Skills I want to learn"} * <span className="normal-case text-gray-400">(pick at least 2)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SKILL_OPTIONS.map(skill => (
                    <button key={skill} onClick={() => toggleItem(skill, skills, setSkills)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        skills.includes(skill)
                          ? "bg-indigo-500 text-white border-indigo-500"
                          : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-indigo-300"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Areas of Interest * <span className="normal-case text-gray-400">(pick at least 1)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map(interest => (
                    <button key={interest} onClick={() => toggleItem(interest, interests, setInterests)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        interests.includes(interest)
                          ? "bg-purple-500 text-white border-purple-500"
                          : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-purple-300"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 3: Preferences ─── */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Preferences</h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Preferred Language *</label>
                <select value={preferredLanguage} onChange={e => setPreferredLanguage(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  {LANGUAGE_OPTIONS.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Education Level *</label>
                <select value={educationLevel} onChange={e => setEducationLevel(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select...</option>
                  {EDUCATION_OPTIONS.map(ed => <option key={ed} value={ed}>{ed}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  <Clock className="w-3.5 h-3.5 inline mr-1" /> Availability *
                </label>
                <div className="space-y-2">
                  {AVAILABILITY_OPTIONS.map(slot => (
                    <button key={slot} onClick={() => setAvailability(slot)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        availability === slot
                          ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-700 dark:text-indigo-400"
                          : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300"
                      }`}
                    >
                      {availability === slot && <CheckCircle className="w-4 h-4 inline mr-2 text-indigo-500" />}
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 4: About You ─── */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">About You</h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Short Bio *</label>
                <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
                  placeholder={role === "mentor" ? "Tell mentees about your experience and teaching style..." : "Tell us about yourself and what you're currently learning..."}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                  {role === "mentor" ? "What do you hope to achieve as a mentor?" : "What are your learning goals?"} *
                </label>
                <textarea value={goals} onChange={e => setGoals(e.target.value)} rows={3}
                  placeholder={role === "mentor" ? "e.g. I want to help students break into tech..." : "e.g. I want to become a full-stack developer in 6 months..."}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
              </div>

              {/* Summary Preview */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Profile Preview</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-gray-400">Name:</span> <span className="font-semibold text-gray-700 dark:text-gray-200">{fullName}</span></div>
                  <div><span className="text-gray-400">Role:</span> <span className="font-semibold text-gray-700 dark:text-gray-200 capitalize">{role}</span></div>
                  <div><span className="text-gray-400">Language:</span> <span className="font-semibold text-gray-700 dark:text-gray-200">{preferredLanguage}</span></div>
                  <div><span className="text-gray-400">Education:</span> <span className="font-semibold text-gray-700 dark:text-gray-200">{educationLevel}</span></div>
                  <div className="col-span-2"><span className="text-gray-400">Skills:</span> <span className="font-semibold text-gray-700 dark:text-gray-200">{skills.join(", ")}</span></div>
                  <div className="col-span-2"><span className="text-gray-400">Interests:</span> <span className="font-semibold text-gray-700 dark:text-gray-200">{interests.join(", ")}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 px-4 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            {step < totalSteps ? (
              <button onClick={() => setStep(step + 1)} disabled={!canProceed()}
                className="flex items-center gap-1 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-md text-sm">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:opacity-40 text-white font-bold rounded-xl transition-all shadow-md text-sm">
                <CheckCircle className="w-4 h-4" /> Complete Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
