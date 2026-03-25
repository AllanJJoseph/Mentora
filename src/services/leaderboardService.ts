import { LeaderboardEntry, UserProfile, Match } from "@/types";

/**
 * Service for calculating leaderboard scores and ranks.
 */
export class LeaderboardService {
  /**
   * Calculates the mentor score based on the PRD formula.
   * mentor_score = (sessions * 0.4) + (consistency * 0.3) + (feedback * 0.2) + (goal_completion * 0.1)
   */
  static calculateMentorScore(stats: { sessions: number; consistency: number; feedback: number; goal_completion: number }): number {
    const score = 
      (stats.sessions * 0.4) + 
      (stats.consistency * 0.3) + 
      (stats.feedback * 0.2) + 
      (stats.goal_completion * 0.1);
    
    return Math.round(score * 10); // Scale for leaderboard display
  }

  /**
   * Calculates the mentee score based on the PRD factors.
   */
  static calculateMenteeScore(stats: { attendance: number; tasks: number; improvement: number; consistency: number }): number {
    const score = 
      (stats.attendance * 0.4) + 
      (stats.tasks * 0.3) + 
      (stats.improvement * 0.2) + 
      (stats.consistency * 0.1);
    
    return Math.round(score * 10);
  }

  /**
   * Assigns badges based on milestones.
   */
  static getBadges(score: number, streak: number): string[] {
    const badges = [];
    if (score > 500) badges.push("Expert Mentor");
    if (score > 200) badges.push("Rising Star");
    if (streak >= 5) badges.push("Consistent Partner");
    if (streak >= 10) badges.push("Unstoppable");
    return badges;
  }
}
