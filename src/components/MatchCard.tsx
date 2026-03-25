import { UserProfile } from "@/types";

interface MatchCardProps {
  mentor: UserProfile;
  score: number;
  explanation: string;
}

export default function MatchCard({ mentor, score, explanation }: MatchCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all border-l-4 border-l-blue-500">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{mentor.displayName}</h3>
          <p className="text-gray-600 text-sm mt-1">{mentor.bio}</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold border border-blue-200">
          {score}% Match
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {mentor.skills.map((skill, i) => (
          <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium border border-gray-200">
            {skill}
          </span>
        ))}
      </div>

      <div className="text-sm text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg border border-blue-100">
        <span className="text-blue-600 font-semibold">AI Insight: </span>
        {explanation}
      </div>

      <button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
        Request Connection
      </button>
    </div>
  );
}
