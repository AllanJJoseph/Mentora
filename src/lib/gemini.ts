import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

export async function generateGeminiContent(prompt: string) {
  if (!genAI) {
    console.warn("GEMINI_API_KEY is not set. Returning mock response.");
    return "AI Explanation: This mentor matches your profile perfectly due to shared expertise in React and a mutual interest in scalable architectures.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating Gemini content:", error);
    return "Failed to generate AI explanation.";
  }
}

export async function explainMatch(mentorId: string, menteeId: string, score: number) {
  const prompt = `Explain in 2-3 sentences why a mentor (ID: ${mentorId}) and a mentee (ID: ${menteeId}) are a good match given a compatibility score of ${score}/100. Highlight the potential for growth and collaboration.`;
  return generateGeminiContent(prompt);
}
