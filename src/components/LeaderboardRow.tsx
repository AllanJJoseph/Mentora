import { LeaderboardEntry } from "@/types";

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
}

export default function LeaderboardRow({ entry }: LeaderboardRowProps) {
  const isTopThree = entry.rank <= 3;
  const rankColors = {
    1: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    2: "bg-slate-300/20 text-slate-300 border-slate-300/30",
    3: "bg-amber-600/20 text-amber-500 border-amber-600/30",
  };

  const rankStyle = isTopThree ? rankColors[entry.rank as keyof typeof rankColors] : "bg-white/5 text-white/40 border-white/10";

  return (
    <div className="flex items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-black text-xl ${rankStyle}`}>
        {entry.rank}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h4 className="font-bold text-white text-lg">{entry.displayName}</h4>
          <span className="text-xs px-2 py-0.5 bg-white/5 rounded text-white/40 uppercase tracking-tighter">
            {entry.role}
          </span>
        </div>
        <div className="flex gap-2 mt-1">
          {entry.badges.map((badge, i) => (
            <span key={i} className="text-[10px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/20">
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="text-right">
        <div className="text-2xl font-black text-white">{entry.score}</div>
        <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Points</div>
      </div>

      <div className="hidden md:flex flex-col items-center justify-center p-3 bg-white/5 rounded-xl min-w-[80px]">
        <div className="text-orange-400 font-black flex items-center gap-1">
          🔥 {entry.streak}
        </div>
        <div className="text-[10px] text-white/30 uppercase font-bold">Streak</div>
      </div>
    </div>
  );
}
