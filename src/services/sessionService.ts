import { generateGeminiContent } from "@/lib/gemini";
import { Session } from "@/types";

export class SessionService {
  /**
   * Processes informal session notes into a structured summary and action items.
   */
  static async processSessionNotes(matchId: string, notes: string) {
    const prompt = `
      As a mentorship assistant, process the following informal notes from a mentor-mentee session.
      Generate:
      1. A concise summary of the discussion.
      2. A list of specific, clear action items for the next session.
      
      Notes: "${notes}"
      
      Respond in JSON format:
      {
        "summary": "...",
        "actionItems": ["...", "..."]
      }
    `;

    const result = await generateGeminiContent(prompt);
    
    try {
      // Small cleanup to ensure it's valid JSON if Gemini adds markdown backticks
      const jsonContent = result.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(jsonContent);
      
      return {
        matchId,
        date: new Date(),
        summary: parsed.summary,
        actionItems: parsed.actionItems,
      };
    } catch (error) {
      console.error("Failed to parse Gemini session summary:", error);
      return {
        matchId,
        date: new Date(),
        summary: result, // Fallback to raw text
        actionItems: [],
      };
    }
  }
}
