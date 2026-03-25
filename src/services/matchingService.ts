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
    const skillMatch = this.calculateSkillMatch(mentor.skills, mentee.skills);
    const languageMatch = mentor.language === mentee.language ? 100 : 0;
    const locationMatch = mentor.location === mentee.location ? 100 : 0; // Strict location match
    const availabilityMatch = mentor.availability === mentee.availability ? 100 : 0;

    const totalScore = 
      (skillMatch * 0.4) + 
      (languageMatch * 0.2) + 
      (locationMatch * 0.2) + 
      (availabilityMatch * 0.2);

    return Math.round(totalScore);
  }

  private static calculateSkillMatch(mentorSkills: string[], menteeSkills: string[]): number {
    if (!menteeSkills.length) return 0;
    
    // Check overlap where mentor has the skill the mentee is learning
    const intersection = mentorSkills.filter(skill => 
      menteeSkills.some(menteeSkill => menteeSkill.toLowerCase() === skill.toLowerCase())
    );
    
    return (intersection.length / menteeSkills.length) * 100;
  }

  /**
   * Generates a match with a personalized AI explanation using real profile data.
   */
  static async createMatch(mentor: UserProfile, mentee: UserProfile) {
    const score = this.calculateScore(mentor, mentee);
    
    // Pass full profile data so both Gemini prompt and fallback are personalized
    const explanation = await explainMatch(
      { name: mentor.displayName, skills: mentor.skills, language: mentor.language || "", location: mentor.location || "" },
      { name: mentee.displayName, skills: mentee.skills, language: mentee.language || "", location: mentee.location || "" },
      score
    );
    
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
