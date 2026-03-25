"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { User, Bell, Globe, Shield, Save, Check } from "lucide-react";

export default function Settings() {
  const [showSuccess, setShowSuccess] = useState(false);

  // Profile Settings
  const [displayName, setDisplayName] = useState("Allan Joe");
  const [email, setEmail] = useState("allan.joe@example.com");
  const [bio, setBio] = useState("Aspiring developer passionate about React and TypeScript");
  const [location, setLocation] = useState("Mumbai, India");
  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js"]);
  const [interests, setInterests] = useState(["Web Development", "UI/UX", "System Design"]);

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [sessionReminders, setSessionReminders] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // Language & Accessibility
  const [preferredLanguage, setPreferredLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [autoTranslate, setAutoTranslate] = useState(true);

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 pt-24 selection:bg-indigo-500/30">
      <Navbar />

      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <a href="/dashboard" className="text-indigo-400 hover:text-indigo-300 text-sm mb-4 inline-block transition-colors">
            ← Back to Dashboard
          </a>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Settings</h1>
          <p className="text-white/60">
            Manage your profile, notifications, and preferences
          </p>
        </header>

        {showSuccess && (
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-400 animate-fade-in">
            <Check className="w-5 h-5" />
            <span className="font-medium">Settings saved successfully!</span>
          </div>
        )}

        {/* Profile Section */}
        <section className="mb-8 p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
            <div className="p-3 bg-indigo-500/20 rounded-xl">
              <User className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold">Profile Information</h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Skills & Interests
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {[...skills, ...interests].map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-sm font-medium flex items-center gap-2 group hover:bg-indigo-500/30 transition-colors"
                  >
                    {item}
                    <button
                      onClick={() => removeSkill(item)}
                      className="text-indigo-300 hover:text-white transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a skill or interest"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addSkill((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors">
                  Add
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="mb-8 p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
            <div className="p-3 bg-amber-500/20 rounded-xl">
              <Bell className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                label: "Email Notifications",
                description: "Receive important updates via email",
                value: emailNotifications,
                onChange: setEmailNotifications
              },
              {
                label: "Push Notifications",
                description: "Get real-time alerts in the app",
                value: pushNotifications,
                onChange: setPushNotifications
              },
              {
                label: "Session Reminders",
                description: "Reminders before scheduled sessions",
                value: sessionReminders,
                onChange: setSessionReminders
              },
              {
                label: "Weekly Digest",
                description: "Summary of your activity and progress",
                value: weeklyDigest,
                onChange: setWeeklyDigest
              }
            ].map((setting, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-white mb-1">{setting.label}</h3>
                  <p className="text-sm text-white/50">{setting.description}</p>
                </div>
                <button
                  onClick={() => setting.onChange(!setting.value)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    setting.value ? 'bg-indigo-500' : 'bg-white/10'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      setting.value ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Language & Accessibility */}
        <section className="mb-8 p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Globe className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold">Language & Accessibility</h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Preferred Language
                </label>
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="English">English</option>
                  <option value="Hindi">हिंदी (Hindi)</option>
                  <option value="Spanish">Español (Spanish)</option>
                  <option value="French">Français (French)</option>
                  <option value="German">Deutsch (German)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="America/New_York">America/New York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl">
              <div>
                <h3 className="font-medium text-white mb-1">Auto-translate messages</h3>
                <p className="text-sm text-white/50">Automatically translate messages from mentors</p>
              </div>
              <button
                onClick={() => setAutoTranslate(!autoTranslate)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  autoTranslate ? 'bg-indigo-500' : 'bg-white/10'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    autoTranslate ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="mb-8 p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold">Privacy & Security</h2>
          </div>

          <div className="space-y-4">
            <button className="w-full p-4 bg-black/20 hover:bg-black/30 rounded-xl text-left transition-colors flex justify-between items-center">
              <div>
                <h3 className="font-medium text-white mb-1">Change Password</h3>
                <p className="text-sm text-white/50">Update your account password</p>
              </div>
              <span className="text-white/40">→</span>
            </button>

            <button className="w-full p-4 bg-black/20 hover:bg-black/30 rounded-xl text-left transition-colors flex justify-between items-center">
              <div>
                <h3 className="font-medium text-white mb-1">Two-Factor Authentication</h3>
                <p className="text-sm text-white/50">Add an extra layer of security</p>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full">
                Recommended
              </span>
            </button>

            <button className="w-full p-4 bg-black/20 hover:bg-black/30 rounded-xl text-left transition-colors flex justify-between items-center">
              <div>
                <h3 className="font-medium text-white mb-1">Download My Data</h3>
                <p className="text-sm text-white/50">Export all your mentorship data</p>
              </div>
              <span className="text-white/40">→</span>
            </button>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <a
            href="/dashboard"
            className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold transition-all"
          >
            Cancel
          </a>
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}
