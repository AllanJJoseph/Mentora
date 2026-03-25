export type Role = 'mentor' | 'mentee' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: Role;
  skills: string[];
  interests: string[];
  bio?: string;
  location?: string;
  language?: string;
  availability?: string; // e.g., "Weekday evenings"
}

export interface Match {
  id: string;
  mentorId: string;
  menteeId: string;
  score: number; // initial match score
  explanation: string;
  status: 'active' | 'pending' | 'closed';
  engagementScore: number; // current health score (0-100)
  healthStatus: 'active' | 'at-risk' | 'inactive';
  lastSessionDate?: Date;
  streakCount: number;
  missedSessions: number;
  createdAt: Date;
}

export interface Session {
  id: string;
  matchId: string;
  date: Date;
  scheduledBy: string;
  duration: number; // in minutes
  notes?: string;
  summary?: string;
  actionItems?: string[];
}

export interface EngagementScore {
  matchId: string;
  score: number;
  lastUpdated: Date;
  status: 'active' | 'at-risk' | 'inactive';
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  role: Role;
  score: number;
  rank: number;
  badges: string[];
  streak: number;
}
