import { Match } from "@/types";

export interface SystemMetrics {
  totalMatches: number;
  activeMatches: number;
  atRiskMatches: number;
  inactiveMatches: number;
  averageHealthScore: number;
  totalSessionsLogged: number;
}

/**
 * Service for aggregating system-wide metrics for the Admin Dashboard.
 */
export class AdminService {
  /**
   * Aggregates metrics from the current pool of matches.
   */
  static getSystemMetrics(matches: Match[]): SystemMetrics {
    if (!matches.length) {
      return {
        totalMatches: 0,
        activeMatches: 0,
        atRiskMatches: 0,
        inactiveMatches: 0,
        averageHealthScore: 0,
        totalSessionsLogged: 0,
      };
    }

    let active = 0;
    let atRisk = 0;
    let inactive = 0;
    let totalScore = 0;
    let totalSessions = 0;

    matches.forEach(match => {
      totalScore += match.engagementScore;
      totalSessions += match.streakCount; // highly simplified proxy for total sessions for demo
      
      if (match.healthStatus === 'active') active++;
      else if (match.healthStatus === 'at-risk') atRisk++;
      else inactive++;
    });

    return {
      totalMatches: matches.length,
      activeMatches: active,
      atRiskMatches: atRisk,
      inactiveMatches: inactive,
      averageHealthScore: Math.round(totalScore / matches.length),
      totalSessionsLogged: totalSessions,
    };
  }
}
