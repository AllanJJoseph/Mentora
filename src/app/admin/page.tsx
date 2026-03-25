"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { AdminService, SystemMetrics } from "@/services/adminService";
import { MOCK_MATCHES } from "@/utils/mockData";
import { 
  Users, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  Clock
} from "lucide-react";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);

  useEffect(() => {
    // Simulate real-time data fetch
    const fetchMetrics = async () => {
      const data = AdminService.getSystemMetrics(MOCK_MATCHES);
      setMetrics(data);
    };

    fetchMetrics();
  }, []);

  if (!metrics) return null;

  const cards = [
    {
      title: "Total Matches",
      value: metrics.totalMatches,
      icon: <Users className="w-5 h-5 text-indigo-400" />,
      color: "border-indigo-500/20 bg-indigo-500/5"
    },
    {
      title: "Active Relationships",
      value: metrics.activeMatches,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/20 bg-emerald-500/5",
      subtext: "Healthy"
    },
    {
      title: "At-Risk Matches",
      value: metrics.atRiskMatches,
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      color: "border-amber-500/20 bg-amber-500/5",
      subtext: "Needs intervention"
    },
    {
      title: "Avg Health Score",
      value: `${metrics.averageHealthScore}%`,
      icon: <Activity className="w-5 h-5 text-pink-400" />,
      color: "border-pink-500/20 bg-pink-500/5",
      subtext: "+5% this week"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 pt-24 selection:bg-indigo-500/30">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight">Admin Overview</h1>
            <p className="text-white/60">System-wide performance and engagement tracking.</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm font-medium transition-all">
              <Clock className="w-4 h-4" /> Last 30 Days
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
              <TrendingUp className="w-4 h-4" /> Download Report
            </button>
          </div>
        </header>

        {/* Top Level Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((card, i) => (
            <div key={i} className={`p-6 rounded-3xl border backdrop-blur-xl ${card.color} transition-transform hover:scale-[1.02]`}>
              <div className="flex justify-between items-start mb-4">
                <span className="p-3 bg-black/20 rounded-2xl">{card.icon}</span>
                {card.subtext && <span className="text-xs font-bold uppercase tracking-widest text-white/40">{card.subtext}</span>}
              </div>
              <p className="text-white/60 text-sm font-medium mb-1">{card.title}</p>
              <h3 className="text-4xl font-black">{card.value}</h3>
            </div>
          ))}
        </section>

        {/* Detailed Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Action Needed */}
          <div className="lg:col-span-2 p-8 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Requires Attention
            </h3>
            
            <div className="space-y-4">
              {MOCK_MATCHES.filter(m => m.healthStatus === 'at-risk').map(match => (
                <div key={match.id} className="flex justify-between items-center p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
                  <div>
                    <h4 className="font-bold text-white mb-1">Match ID: {match.id.substring(0,8)}...</h4>
                    <p className="text-xs text-white/60">Missed {match.missedSessions} sessions. Score: {match.engagementScore}%</p>
                  </div>
                  <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold rounded-xl transition-colors">
                    Trigger Nudge
                  </button>
                </div>
              ))}
              {MOCK_MATCHES.filter(m => m.healthStatus === 'at-risk').length === 0 && (
                <p className="text-white/40 italic p-4 text-center border border-dashed border-white/10 rounded-2xl">
                  No matches currently at risk. Excellent!
                </p>
              )}
            </div>
          </div>

          {/* Platform Activity */}
          <div className="p-8 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-[40px] backdrop-blur-xl">
             <h3 className="text-xl font-bold mb-6">Platform Pulse</h3>
             
             <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Sessions Logged</span>
                    <span className="font-bold">{metrics.totalSessionsLogged}</span>
                  </div>
                  <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[75%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">AI Explanations Gen</span>
                    <span className="font-bold">24</span>
                  </div>
                  <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[60%] rounded-full"></div>
                  </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </main>
  );
}
