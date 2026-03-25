import { Match, Session } from "@/types";

/**
 * Service for tracking and updating the health of mentor-mentee relationships.
 */
export class HealthTrackerService {
  /**
   * Calculates the engagement health score based on session history.
   * Logic:
   * - Streak counts highly.
   * - Missed sessions penalize heavily.
   * - Frequency of sessions matters.
   */
  static calculateHealth(match: Match, sessions: Session[]): { score: number; status: 'active' | 'at-risk' | 'inactive' } {
    let score = 50; // Baseline

    // 1. Frequency bonus (Active: sessions happening weekly)
    const now = new Date();
    const lastSessionDate = match.lastSessionDate ? new Date(match.lastSessionDate) : null;
    
    if (lastSessionDate) {
      const daysSinceLastSession = Math.floor((now.getTime() - lastSessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLastSession <= 7) score += 20;
      else if (daysSinceLastSession <= 14) score += 5;
      else if (daysSinceLastSession > 30) score -= 30;
      else score -= 10;
    }

    // 2. Streak bonus
    score += match.streakCount * 5;

    // 3. Missed session penalty
    score -= match.missedSessions * 15;

    // Clamp score
    score = Math.max(0, Math.min(100, score));

    // Categorize status
    let status: 'active' | 'at-risk' | 'inactive' = 'inactive';
    if (score >= 70) status = 'active';
    else if (score >= 40) status = 'at-risk';

    return { score, status };
  }

  /**
   * Updates the match object with new health stats.
   */
  static updateMatchHealth(match: Match, sessions: Session[]): Match {
    const { score, status } = this.calculateHealth(match, sessions);
    
    return {
      ...match,
      engagementScore: score,
      healthStatus: status,
    };
  }
}
