/**
 * Translation Service using MyMemory Free API
 * https://mymemory.translated.net/doc/spec.php
 * 
 * No API key required. Supports all major languages.
 * Free tier: 5000 chars/day (plenty for hackathon demo).
 */

// Language name → ISO 639-1 code mapping
const LANG_CODES: Record<string, string> = {
  "english": "en",
  "malayalam": "ml",
  "tamil": "ta",
  "hindi": "hi",
  "telugu": "te",
  "kannada": "kn",
  "spanish": "es",
  "french": "fr",
  "arabic": "ar",
  "portuguese": "pt",
  "german": "de",
  "japanese": "ja",
  "korean": "ko",
  "chinese": "zh",
  "russian": "ru",
  "italian": "it",
};

function getISOCode(language: string): string {
  const lower = language.toLowerCase().trim();
  return LANG_CODES[lower] || lower;
}

export class TranslationService {
  /**
   * Translates text to a target language using the free MyMemory API.
   */
  static async translateText(text: string, targetLanguage: string): Promise<string> {
    if (!text.trim()) return "";

    const targetCode = getISOCode(targetLanguage);

    try {
      // Auto-detect source language by defaulting to "autodetect"
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=autodetect|${targetCode}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        const translated = data.responseData.translatedText;
        // MyMemory sometimes returns the original text in uppercase if it can't translate
        if (translated.toUpperCase() === text.toUpperCase()) {
          return text; // Fallback to original
        }
        return translated;
      }

      console.warn("MyMemory translation response:", data);
      return text; // Fallback
    } catch (error) {
      console.error("Translation failed:", error);
      return text; // Fallback to original text
    }
  }

  /**
   * Detects the language of a given text (simple heuristic for demo).
   */
  static async detectLanguage(text: string): Promise<string> {
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 50))}&langpair=autodetect|en`;
      const response = await fetch(url);
      const data = await response.json();
      return data.responseData?.detectedLanguage || "Unknown";
    } catch {
      return "Unknown";
    }
  }
}
