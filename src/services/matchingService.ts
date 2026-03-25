import { UserProfile } from "@/types";
import { explainMatch } from "@/lib/gemini";

/**
 * Service for matching mentors and mentees based on the PRD scoring formula.
 * score = (skill_match * 0.4) + (language_match * 0.2) + (location_match * 0.2) + (availability_match * 0.2)
 */

export class MatchingService {
  /**
   * Calculates the match score between a mentor and a mentee.
   */
  static calculateScore(mentor: UserProfile, mentee: UserProfile): number {
    const skillMatch = this.calculateSkillMatch(mentor.skills, mentee.interests);
    const languageMatch = mentor.language === mentee.language ? 100 : 0;
    const locationMatch = mentor.location === mentee.location ? 100 : 50; // Proximity bonus
    const availabilityMatch = mentor.availability === mentee.availability ? 100 : 0;

    const totalScore = 
      (skillMatch * 0.4) + 
      (languageMatch * 0.2) + 
      (locationMatch * 0.2) + 
      (availabilityMatch * 0.2);

    return Math.round(totalScore);
  }

  private static calculateSkillMatch(mentorSkills: string[], menteeInterests: string[]): number {
    if (!menteeInterests.length) return 0;
    
    const intersection = mentorSkills.filter(skill => 
      menteeInterests.some(interest => interest.toLowerCase() === skill.toLowerCase())
    );
    
    return (intersection.length / menteeInterests.length) * 100;
  }

  /**
   * Generates a match and gets an AI explanation.
   */
  static async createMatch(mentor: UserProfile, mentee: UserProfile) {
    const score = this.calculateScore(mentor, mentee);
    const explanation = await explainMatch(mentor.uid, mentee.uid, score);
    
    return {
      mentorId: mentor.uid,
      menteeId: mentee.uid,
      score,
      explanation,
      status: 'pending' as const,
      createdAt: new Date(),
    };
  }
}
