// ─── mockData.ts — Now powered by the real CSV dataset ───
import { Match, UserProfile } from "@/types";
import { DATASET_MENTORS, DATASET_MENTEES } from "@/utils/dataset";

// ─── Convert dataset mentors to UserProfile format ───
export const MOCK_MENTORS: UserProfile[] = DATASET_MENTORS.map((m) => ({
  uid: m.id,
  email: m.email,
  displayName: m.name,
  role: "mentor" as const,
  skills: m.skills,
  interests: m.interests,
  bio: m.bio,
  location: m.location,
  language: m.language,
  availability: m.availability,
}));

// ─── Convert dataset mentees to UserProfile format ───
export const MOCK_MENTEES: UserProfile[] = DATASET_MENTEES.map((m) => ({
  uid: m.id,
  email: m.email,
  displayName: m.name,
  role: "mentee" as const,
  skills: m.skills,
  interests: m.interests,
  bio: m.bio,
  location: m.location,
  language: m.language,
  availability: m.availability,
}));

export const MOCK_MENTEE: UserProfile = MOCK_MENTEES[0];

// ─── Generate realistic matches pairing mentees with mentors ───
export const MOCK_MATCHES: Match[] = [
  {
    id: "match_active",
    mentorId: MOCK_MENTORS[0]?.uid || "mentor_50",
    menteeId: MOCK_MENTEES[0]?.uid || "mentee_0",
    score: 85,
    explanation: `Strong match — shared skills in ${MOCK_MENTORS[0]?.skills.slice(0, 2).join(" and ")} with compatible availability.`,
    status: "active",
    engagementScore: 90,
    healthStatus: "active",
    lastSessionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    streakCount: 5,
    missedSessions: 0,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    sessionsAttended: 12,
    testScores: [85, 90, 88, 95],
    feedbackScore: 4.8,
    assignmentConsistency: 95,
    activityLevel: "High",
  },
  {
    id: "match_risk",
    mentorId: MOCK_MENTORS[1]?.uid || "mentor_51",
    menteeId: MOCK_MENTEES[1]?.uid || "mentee_1",
    score: 75,
    explanation: `Moderate match — overlapping interest in ${MOCK_MENTORS[1]?.interests?.[0] || "technology"}.`,
    status: "active",
    engagementScore: 45,
    healthStatus: "at-risk",
    lastSessionDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    streakCount: 0,
    missedSessions: 2,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    sessionsAttended: 4,
    testScores: [65, 70, 68],
    feedbackScore: 3.2,
    assignmentConsistency: 40,
    activityLevel: "Low",
  },
  {
    id: "match_inactive",
    mentorId: MOCK_MENTORS[2]?.uid || "mentor_52",
    menteeId: MOCK_MENTEES[2]?.uid || "mentee_2",
    score: 60,
    explanation: `Good skill overlap in ${MOCK_MENTORS[2]?.skills?.[0] || "development"}, but engagement has dropped.`,
    status: "active",
    engagementScore: 20,
    healthStatus: "inactive",
    lastSessionDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    streakCount: 0,
    missedSessions: 5,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    sessionsAttended: 2,
    testScores: [55, 60],
    feedbackScore: 2.5,
    assignmentConsistency: 25,
    activityLevel: "Low",
  },
  // Additional matches from the dataset
  ...MOCK_MENTORS.slice(3, 10).map((mentor, i) => ({
    id: `match_${i + 3}`,
    mentorId: mentor.uid,
    menteeId: MOCK_MENTEES[i + 3]?.uid || `mentee_${i + 3}`,
    score: 80 - i * 3,
    explanation: `Matched on ${mentor.skills[0]} expertise and ${mentor.language} language compatibility.`,
    status: "active" as const,
    engagementScore: Math.max(90 - i * 10, 30),
    healthStatus: (i < 3 ? "active" : i < 5 ? "at-risk" : "inactive") as "active" | "at-risk" | "inactive",
    lastSessionDate: new Date(Date.now() - (i + 1) * 5 * 24 * 60 * 60 * 1000),
    streakCount: Math.max(5 - i, 0),
    missedSessions: i,
    createdAt: new Date(Date.now() - (30 + i * 10) * 24 * 60 * 60 * 1000),
    sessionsAttended: Math.max(10 - i, 1),
    testScores: [85 - i * 5, 80 - i * 4, 75 - i * 3],
    feedbackScore: Math.max(4.5 - i * 0.3, 2.0),
    assignmentConsistency: Math.max(90 - i * 10, 20),
    activityLevel: (i < 3 ? "High" : i < 5 ? "Moderate" : "Low") as "High" | "Moderate" | "Low",
  })),
];
