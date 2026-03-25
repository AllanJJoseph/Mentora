import { Match, UserProfile } from "@/types";

export const MOCK_MENTORS: UserProfile[] = [
  {
    uid: "mentor_1",
    email: "sarah.dev@example.com",
    displayName: "Sarah Chen",
    role: "mentor",
    skills: ["React", "TypeScript", "System Design"],
    interests: ["Teaching", "Open Source"],
    bio: "Senior Software Engineer with 8 years of experience.",
    location: "Remote",
    language: "English",
    availability: "Weekday evenings"
  },
  {
    uid: "mentor_2",
    email: "james.ux@example.com",
    displayName: "James Wilson",
    role: "mentor",
    skills: ["Figma", "Accessibility", "Product Strategy"],
    interests: ["Design Systems", "Mentorship"],
    bio: "UX Director passionate about inclusive design.",
    location: "New York",
    language: "English",
    availability: "Weekends"
  }
];

export const MOCK_MENTEE: UserProfile = {
  uid: "mentee_1",
  email: "allan.learner@example.com",
  displayName: "Allan Joe",
  role: "mentee",
  skills: ["JavaScript", "HTML"],
  interests: ["React", "TypeScript", "Fullstack Development"],
  bio: "Aspiring developer looking for guidance in frontend architecture.",
  location: "Remote",
  language: "English",
  availability: "Weekday evenings"
};

export const MOCK_MATCHES: Match[] = [
  {
    id: "match_active",
    mentorId: "mentor_1",
    menteeId: "mentee_1",
    score: 85,
    explanation: "Excellent match based on shared skills in React and TypeScript.",
    status: 'active',
    engagementScore: 90,
    healthStatus: 'active',
    lastSessionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    streakCount: 5,
    missedSessions: 0,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  },
  {
    id: "match_risk",
    mentorId: "mentor_2",
    menteeId: "mentee_1",
    score: 75,
    explanation: "Good match for UI/UX exploration.",
    status: 'active',
    engagementScore: 45,
    healthStatus: 'at-risk',
    lastSessionDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    streakCount: 0,
    missedSessions: 2,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
  }
];
