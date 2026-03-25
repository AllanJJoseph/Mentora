import { UserProfile } from "@/types";
import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

interface MatchCardProps {
  mentor: UserProfile;
  score: number;
  explanation: string;
}

export default function MatchCard({ mentor, score, explanation }: MatchCardProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "connected">("idle");

  const handleConnect = () => {
    setStatus("loading");
    // Simulate API call for connection
    setTimeout(() => {
      setStatus("connected");
    }, 1500);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all border-l-4 border-l-indigo-500 backdrop-blur-xl">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{mentor.displayName}</h3>
          <p className="text-white/60 text-sm mt-1">{mentor.bio}</p>
        </div>
        <div className="bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-xl text-sm font-bold border border-indigo-500/30">
          {score}% Match
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {mentor.skills.map((skill, i) => (
          <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 font-medium border border-white/10">
            {skill}
          </span>
        ))}
      </div>

      <div className="text-sm text-white/80 leading-relaxed bg-indigo-500/10 p-5 rounded-xl border border-indigo-500/20">
        <span className="text-indigo-400 font-bold block mb-1 flex items-center gap-2">
          ✨ AI Insight
        </span>
        {explanation}
      </div>

      <button 
        onClick={handleConnect}
        disabled={status !== "idle"}
        className={`w-full mt-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2
          ${status === "idle" 
            ? "bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
            : status === "loading"
            ? "bg-white/10 text-white/50 cursor-not-allowed"
            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
          }`}
      >
        {status === "idle" && "Request Connection"}
        {status === "loading" && <><Loader2 className="w-5 h-5 animate-spin" /> Connecting...</>}
        {status === "connected" && <><CheckCircle className="w-5 h-5" /> Request Sent!</>}
      </button>
    </div>
  );
}
