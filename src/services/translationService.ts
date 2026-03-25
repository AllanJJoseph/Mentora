/**
 * Service for handling cross-language translation using Gemini API as a fallback
 * for a dedicated translation service (like LibreTranslate or Google Translate).
 * Using Gemini here for simplicity since the SDK is already integrated.
 */
import { generateGeminiContent } from "@/lib/gemini";

export class TranslationService {
  /**
   * Translates text to a target language.
   */
  static async translateText(text: string, targetLanguage: string): Promise<string> {
    if (!text) return "";

    const prompt = `
      Translate the following text into ${targetLanguage}. 
      Provide ONLY the translated text without any conversational filler, markdown formatting, or quotes.
      
      Text: "${text}"
    `;

    try {
      const translated = await generateGeminiContent(prompt);
      return translated.trim();
    } catch (error) {
      console.error("Translation failed:", error);
      return text; // Fallback to original text on failure
    }
  }

  /**
   * Detects the language of a given text.
   */
  static async detectLanguage(text: string): Promise<string> {
    const prompt = `
      Detect the primary language of the following text.
      Return ONLY the ISO 639-1 code (e.g., 'en', 'es', 'hi') or full language name.
      
      Text: "${text}"
    `;

    try {
      const language = await generateGeminiContent(prompt);
      return language.trim();
    } catch (error) {
      console.error("Language detection failed:", error);
      return "Unknown";
    }
  }
}
