import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

export async function generateGeminiContent(prompt: string) {
  if (!genAI) {
    console.warn("GEMINI_API_KEY is not set. Using deterministic fallback.");
    return null; // Return null so callers can build their own fallback
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating Gemini content:", error);
    return null;
  }
}

/**
 * Generates a rich AI explanation for why a mentor-mentee pair is a good match.
 * Uses real profile data for both the Gemini prompt and the deterministic fallback.
 */
export async function explainMatch(
  mentor: { name: string; skills: string[]; language: string; location: string },
  mentee: { name: string; skills: string[]; language: string; location: string },
  score: number
) {
  // Find overlapping skills for context
  const sharedSkills = mentor.skills.filter(s =>
    mentee.skills.some(ms => ms.toLowerCase() === s.toLowerCase())
  );
  const sameLanguage = mentor.language === mentee.language;
  const sameLocation = mentor.location === mentee.location;

  // Try Gemini first
  const prompt = `You are a mentorship platform AI. In exactly 2 sentences, explain why ${mentor.name} (mentor, skills: ${mentor.skills.join(", ")}, language: ${mentor.language}, location: ${mentor.location}) is a good match for ${mentee.name} (mentee, skills: ${mentee.skills.join(", ")}, language: ${mentee.language}, location: ${mentee.location}). Their compatibility score is ${score}%. Be specific about the skill overlap and practical benefits.`;

  const aiResult = await generateGeminiContent(prompt);
  if (aiResult) return aiResult;

  // ─── Smart Deterministic Fallback (no API key needed) ───
  const parts: string[] = [];

  if (sharedSkills.length > 0) {
    parts.push(`${mentor.name} brings expertise in ${sharedSkills.join(" and ")}, directly aligning with ${mentee.name}'s learning goals.`);
  } else {
    parts.push(`${mentor.name}'s skills in ${mentor.skills.slice(0, 2).join(" and ")} complement ${mentee.name}'s existing knowledge, opening new learning paths.`);
  }

  if (sameLanguage && sameLocation) {
    parts.push(`They share the same language (${mentor.language}) and location (${mentor.location}), making communication and scheduling seamless.`);
  } else if (sameLanguage) {
    parts.push(`Both communicate in ${mentor.language}, ensuring clear and effective mentoring sessions.`);
  } else if (sameLocation) {
    parts.push(`Being in the same city (${mentor.location}) opens up the possibility of in-person sessions.`);
  } else {
    parts.push(`Cross-location mentoring between ${mentor.location} and ${mentee.location} brings diverse industry perspectives.`);
  }

  return parts.join(" ");
}
