export interface BadgeDef {
  id: string;
  name: string;
  description: string;
  role: 'mentor' | 'mentee';
  iconRef: string;
  bgGrad: string;
  ribbonGrad: string;
  shadow: string; 
}

export const MENTOR_BADGES: BadgeDef[] = [
  { id: "m_first", name: "First Step", description: "Conducted your very first mentorship session.", role: 'mentor', iconRef: "Flag", bgGrad: "from-sky-400 to-blue-500", ribbonGrad: "from-blue-600 to-sky-600", shadow: "shadow-blue-500/40" },
  { id: "m_empathy", name: "Empathy Engine", description: "Received a 5-star rating for being incredibly supportive.", role: 'mentor', iconRef: "Heart", bgGrad: "from-rose-400 to-red-500", ribbonGrad: "from-red-600 to-rose-600", shadow: "shadow-red-500/40" },
  { id: "m_patience", name: "Patience Pillar", description: "Guided a mentee through a difficult blocker.", role: 'mentor', iconRef: "Anchor", bgGrad: "from-teal-400 to-emerald-500", ribbonGrad: "from-emerald-600 to-teal-600", shadow: "shadow-teal-500/40" },
  { id: "m_feedback", name: "Feedback Fanatic", description: "Consistently provided detailed action items post-session.", role: 'mentor', iconRef: "MessageSquare", bgGrad: "from-violet-400 to-purple-500", ribbonGrad: "from-purple-600 to-violet-600", shadow: "shadow-violet-500/40" },
  { id: "m_time", name: "Time Titan", description: "Never missed or rescheduled a session in 30 days.", role: 'mentor', iconRef: "Clock", bgGrad: "from-amber-300 to-orange-400", ribbonGrad: "from-orange-500 to-amber-600", shadow: "shadow-orange-500/40" },
  
  { id: "m_consistency", name: "Consistency King", description: "Maintained a 4-week active streak with a single mentee.", role: 'mentor', iconRef: "Activity", bgGrad: "from-cyan-400 to-indigo-500", ribbonGrad: "from-indigo-600 to-cyan-600", shadow: "shadow-indigo-500/40" },
  { id: "m_10_sessions", name: "Ten-Session Vet", description: "Successfully logged 10 total sessions on the platform.", role: 'mentor', iconRef: "Layers", bgGrad: "from-fuchsia-400 to-pink-500", ribbonGrad: "from-pink-600 to-fuchsia-600", shadow: "shadow-pink-500/40" },
  { id: "m_wisdom", name: "Wisdom Weaver", description: "Recommended 5+ external resources to mentees.", role: 'mentor', iconRef: "BookOpen", bgGrad: "from-lime-400 to-green-500", ribbonGrad: "from-green-600 to-lime-600", shadow: "shadow-green-500/40" },
  { id: "m_goal", name: "Goal Guardian", description: "Helped a mentee achieve 100% of their monthly goal.", role: 'mentor', iconRef: "Shield", bgGrad: "from-blue-400 to-indigo-600", ribbonGrad: "from-indigo-700 to-blue-700", shadow: "shadow-indigo-500/40" },
  { id: "m_growth", name: "Growth Guru", description: "Raised a mentee's health score by over 30 points.", role: 'mentor', iconRef: "TrendingUp", bgGrad: "from-orange-400 to-red-500", ribbonGrad: "from-red-600 to-orange-700", shadow: "shadow-red-500/40" },

  { id: "m_impact", name: "Impact Architect", description: "Mentored 3 different students concurrently.", role: 'mentor', iconRef: "Compass", bgGrad: "from-emerald-400 to-cyan-500", ribbonGrad: "from-cyan-600 to-emerald-600", shadow: "shadow-cyan-500/40" },
  { id: "m_guiding_star", name: "Guiding Star", description: "Remained a top-rated mentor for 3 consecutive months.", role: 'mentor', iconRef: "Star", bgGrad: "from-yellow-300 to-yellow-500", ribbonGrad: "from-yellow-600 to-yellow-500", shadow: "shadow-yellow-500/40" },
  { id: "m_visionary", name: "Visionary", description: "Created an entire custom learning path for a mentee.", role: 'mentor', iconRef: "Eye", bgGrad: "from-purple-400 to-fuchsia-600", ribbonGrad: "from-fuchsia-700 to-purple-600", shadow: "shadow-fuchsia-500/40" },
  { id: "m_igniter", name: "The Igniter", description: "Sparked a massive engagement turnaround in an at-risk mentee.", role: 'mentor', iconRef: "Zap", bgGrad: "from-red-500 to-rose-600", ribbonGrad: "from-rose-700 to-red-700", shadow: "shadow-rose-500/40" },
  { id: "m_master", name: "Master Mentor", description: "The pinnacle achievement. Conducted 50+ flawless sessions.", role: 'mentor', iconRef: "Crown", bgGrad: "from-yellow-400 via-amber-500 to-orange-500", ribbonGrad: "from-orange-600 to-amber-700", shadow: "shadow-orange-500/50" },
];

export const MENTEE_BADGES: BadgeDef[] = [
  { id: "s_first", name: "First Session", description: "Attended your first ever mentorship class.", role: 'mentee', iconRef: "Flag", bgGrad: "from-blue-300 to-blue-500", ribbonGrad: "from-blue-600 to-blue-500", shadow: "shadow-blue-500/40" },
  { id: "s_curious", name: "Curious Mind", description: "Asked 5 meaningful technical questions in chat.", role: 'mentee', iconRef: "Search", bgGrad: "from-emerald-300 to-emerald-500", ribbonGrad: "from-emerald-600 to-emerald-500", shadow: "shadow-emerald-500/40" },
  { id: "s_collaborator", name: "Collaborator", description: "Responded to all mentor messages within 24 hours.", role: 'mentee', iconRef: "Users", bgGrad: "from-violet-300 to-violet-500", ribbonGrad: "from-violet-600 to-violet-500", shadow: "shadow-violet-500/40" },
  { id: "s_question", name: "Question Master", description: "Pushed boundaries asking advanced conceptual questions.", role: 'mentee', iconRef: "HelpCircle", bgGrad: "from-pink-400 to-rose-500", ribbonGrad: "from-rose-600 to-pink-600", shadow: "shadow-pink-500/40" },
  { id: "s_homework", name: "Homework Hero", description: "Completed an assignment 3 days ahead of schedule.", role: 'mentee', iconRef: "BookOpen", bgGrad: "from-amber-400 to-yellow-500", ribbonGrad: "from-yellow-600 to-amber-600", shadow: "shadow-yellow-500/40" },

  { id: "s_goal", name: "Goal Getter", description: "Smashed 3 action items in a single week.", role: 'mentee', iconRef: "Target", bgGrad: "from-rose-500 to-orange-500", ribbonGrad: "from-orange-600 to-rose-700", shadow: "shadow-orange-500/40" },
  { id: "s_consistency", name: "Consistency King", description: "Attended classes consistently for 1 full month.", role: 'mentee', iconRef: "Activity", bgGrad: "from-cyan-500 to-blue-600", ribbonGrad: "from-blue-700 to-cyan-700", shadow: "shadow-blue-500/40" },
  { id: "s_scholar", name: "Dedicated Scholar", description: "Logged over 10 hours of active mentorship calls.", role: 'mentee', iconRef: "GraduationCap", bgGrad: "from-indigo-400 to-purple-600", ribbonGrad: "from-purple-700 to-indigo-700", shadow: "shadow-purple-500/40" },
  { id: "s_attendance", name: "Perfect Attendance", description: "Never missed or was late to a scheduled session.", role: 'mentee', iconRef: "CheckCircle", bgGrad: "from-lime-500 to-emerald-600", ribbonGrad: "from-emerald-700 to-lime-700", shadow: "shadow-lime-500/40" },
  { id: "s_fast", name: "Fast Learner", description: "Graduated from beginner to intermediate topics rapidly.", role: 'mentee', iconRef: "Zap", bgGrad: "from-yellow-400 to-orange-500", ribbonGrad: "from-orange-600 to-yellow-600", shadow: "shadow-orange-500/40" },

  { id: "s_innovator", name: "Innovator", description: "Built a side-project utilizing mentor concepts.", role: 'mentee', iconRef: "Lightbulb", bgGrad: "from-fuchsia-500 to-purple-600", ribbonGrad: "from-purple-700 to-fuchsia-700", shadow: "shadow-fuchsia-500/40" },
  { id: "s_rising_star", name: "Rising Star", description: "The fastest growing engagement score this quarter.", role: 'mentee', iconRef: "Star", bgGrad: "from-yellow-300 via-yellow-400 to-amber-400", ribbonGrad: "from-amber-600 to-yellow-600", shadow: "shadow-yellow-500/40" },
  { id: "s_resilient", name: "Resilient Spirit", description: "Overcame a 2-week block and jumped back to an active streak.", role: 'mentee', iconRef: "Shield", bgGrad: "from-teal-400 to-cyan-500", ribbonGrad: "from-cyan-600 to-teal-600", shadow: "shadow-teal-500/40" },
  { id: "s_streak", name: "Streak Master", description: "Held an unbroken 10-week learning streak.", role: 'mentee', iconRef: "Flame", bgGrad: "from-red-500 via-orange-500 to-yellow-500", ribbonGrad: "from-orange-700 to-red-700", shadow: "shadow-red-500/50" },
  { id: "s_future_leader", name: "Future Leader", description: "Demonstrated extreme autonomy and project mastery.", role: 'mentee', iconRef: "Crown", bgGrad: "from-purple-500 to-indigo-600", ribbonGrad: "from-indigo-800 to-purple-800", shadow: "shadow-purple-500/50" },
];

export const ALL_BADGES = [...MENTOR_BADGES, ...MENTEE_BADGES];
