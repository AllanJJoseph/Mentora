"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Bell, Clock, AlertCircle, Mail, MessageSquare, Check } from "lucide-react";

interface NudgeRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
  threshold: number;
}

export default function ConfigureNudges() {
  const [rules, setRules] = useState<NudgeRule[]>([
    {
      id: "1",
      name: "Inactive Relationship Alert",
      trigger: "No session in 30 days",
      action: "Email + In-app notification",
      enabled: true,
      threshold: 30
    },
    {
      id: "2",
      name: "At-Risk Match Intervention",
      trigger: "Health score drops below 40%",
      action: "Send engagement tips",
      enabled: true,
      threshold: 40
    },
    {
      id: "3",
      name: "Missed Session Follow-up",
      trigger: "2 consecutive missed sessions",
      action: "Personal check-in message",
      enabled: true,
      threshold: 2
    },
    {
      id: "4",
      name: "Streak Celebration",
      trigger: "5 consecutive weekly sessions",
      action: "Send congratulations badge",
      enabled: true,
      threshold: 5
    },
    {
      id: "5",
      name: "Goal Progress Check",
      trigger: "14 days without session notes",
      action: "Reminder to log progress",
      enabled: false,
      threshold: 14
    }
  ]);

  const [showSuccess, setShowSuccess] = useState(false);

  const toggleRule = (id: string) => {
    setRules(rules.map(rule =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const updateThreshold = (id: string, value: number) => {
    setRules(rules.map(rule =>
      rule.id === id ? { ...rule, threshold: value } : rule
    ));
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 pt-24 selection:bg-indigo-500/30">
      <Navbar />

      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <a href="/health-demo" className="text-indigo-400 hover:text-indigo-300 text-sm mb-4 inline-block transition-colors">
            ← Back to Health Tracker
          </a>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Configure Nudges</h1>
          <p className="text-white/60 max-w-2xl">
            Set up automated interventions to maintain healthy mentorship relationships.
            Customize thresholds and actions based on your platform's needs.
          </p>
        </header>

        {showSuccess && (
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-400 animate-fade-in">
            <Check className="w-5 h-5" />
            <span className="font-medium">Settings saved successfully!</span>
          </div>
        )}

        <section className="space-y-6 mb-12">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`p-6 rounded-3xl border backdrop-blur-xl transition-all ${
                rule.enabled
                  ? 'bg-white/5 border-white/10 hover:bg-white/10'
                  : 'bg-white/[0.02] border-white/5'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      rule.enabled ? 'bg-indigo-500/20' : 'bg-white/5'
                    }`}>
                      {rule.id === "1" && <Clock className="w-5 h-5 text-indigo-400" />}
                      {rule.id === "2" && <AlertCircle className="w-5 h-5 text-amber-400" />}
                      {rule.id === "3" && <MessageSquare className="w-5 h-5 text-blue-400" />}
                      {rule.id === "4" && <Bell className="w-5 h-5 text-emerald-400" />}
                      {rule.id === "5" && <Mail className="w-5 h-5 text-purple-400" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-lg font-bold ${
                          rule.enabled ? 'text-white' : 'text-white/40'
                        }`}>
                          {rule.name}
                        </h3>
                        {rule.enabled && (
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase rounded-full">
                            Active
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <p className={`text-sm ${
                          rule.enabled ? 'text-white/60' : 'text-white/30'
                        }`}>
                          <span className="font-medium text-white/80">Trigger:</span> {rule.trigger}
                        </p>
                        <p className={`text-sm ${
                          rule.enabled ? 'text-white/60' : 'text-white/30'
                        }`}>
                          <span className="font-medium text-white/80">Action:</span> {rule.action}
                        </p>
                      </div>

                      {rule.enabled && (
                        <div className="mt-4 flex items-center gap-4">
                          <label className="text-sm text-white/60">Threshold:</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min={rule.id === "2" ? 10 : 1}
                              max={rule.id === "2" ? 100 : rule.id === "1" ? 60 : rule.id === "4" ? 20 : 30}
                              value={rule.threshold}
                              onChange={(e) => updateThreshold(rule.id, parseInt(e.target.value))}
                              className="w-32 accent-indigo-500"
                            />
                            <span className="text-sm font-bold text-indigo-400 min-w-[60px]">
                              {rule.threshold}{rule.id === "2" ? "%" : rule.id === "3" || rule.id === "4" ? " times" : " days"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    rule.enabled
                      ? 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                      : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                  }`}
                >
                  {rule.enabled ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          ))}
        </section>

        <section className="p-8 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-3xl mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="p-1 px-2 bg-indigo-500 rounded text-xs">Pro Tip</span>
            Nudge Best Practices
          </h3>
          <ul className="space-y-3 text-white/70 text-sm leading-relaxed">
            <li className="flex gap-3">
              <span className="text-indigo-400 font-bold">•</span>
              <span>Start with moderate thresholds and adjust based on user feedback</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-400 font-bold">•</span>
              <span>Combine multiple channels (email + in-app) for critical alerts</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-400 font-bold">•</span>
              <span>Use positive reinforcement nudges (celebrations) to encourage good behavior</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-400 font-bold">•</span>
              <span>Monitor nudge effectiveness and disable low-performing rules</span>
            </li>
          </ul>
        </section>

        <div className="flex justify-end gap-4">
          <a
            href="/health-demo"
            className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold transition-all"
          >
            Cancel
          </a>
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </main>
  );
}
