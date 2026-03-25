"use client";

import Navbar from "@/components/Navbar";
import VoiceInput from "@/components/VoiceInput";
import { TranslationService } from "@/services/translationService";
import { useProfile } from "@/context/ProfileContext";
import { useState, useRef, useEffect } from "react";
import { Send, Mic, Globe, MessageCircle, Circle, Languages, ChevronRight, Sparkles } from "lucide-react";

// ─── Language Code Map ───
const LANGUAGES = [
  { code: "en-US", name: "English", flag: "🇬🇧" },
  { code: "ml-IN", name: "Malayalam", flag: "🇮🇳" },
  { code: "ta-IN", name: "Tamil", flag: "🇮🇳" },
  { code: "hi-IN", name: "Hindi", flag: "🇮🇳" },
  { code: "te-IN", name: "Telugu", flag: "🇮🇳" },
  { code: "kn-IN", name: "Kannada", flag: "🇮🇳" },
  { code: "es-ES", name: "Spanish", flag: "🇪🇸" },
  { code: "fr-FR", name: "French", flag: "🇫🇷" },
  { code: "ar-SA", name: "Arabic", flag: "🇸🇦" },
];

// ─── Language Code Mapping ───
const LANG_CODE_MAP: Record<string, string> = {
  "English": "en-US", "Malayalam": "ml-IN", "Tamil": "ta-IN", "Hindi": "hi-IN",
  "Telugu": "te-IN", "Kannada": "kn-IN", "Spanish": "es-ES", "French": "fr-FR", "Arabic": "ar-SA",
};

// ─── Build mentor list from dataset ───
import { DATASET_MENTORS, DATASET_MENTEES } from "@/utils/dataset";

interface OnlineMentor {
  id: string;
  name: string;
  avatar: string;
  language: string;
  languageCode: string;
  specialty: string;
  online: boolean;
  isPeer?: boolean;
  avgScore?: number;
}

const ONLINE_MENTORS: OnlineMentor[] = [
  // Real mentors from the dataset
  ...DATASET_MENTORS.map((m, i) => ({
    id: m.id,
    name: m.name,
    avatar: m.name.charAt(0),
    language: m.language,
    languageCode: LANG_CODE_MAP[m.language] || "en-US",
    specialty: m.skills.slice(0, 2).join(" & "),
    online: i % 2 === 0, // alternating online/offline
  })),
  // Top-scoring mentees as peer tutors
  ...DATASET_MENTEES.slice(0, 3).map((m, i) => ({
    id: `peer_${i}`,
    name: m.name,
    avatar: m.name.charAt(0),
    language: m.language,
    languageCode: LANG_CODE_MAP[m.language] || "en-US",
    specialty: m.skills.slice(0, 2).join(" & "),
    online: true,
    isPeer: true,
    avgScore: 94 - i * 3,
  })),
];

// ─── Chat Message Type ───
interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  originalText: string;
  originalLang: string;
  translatedText?: string;
  translatedLang?: string;
  timestamp: Date;
  isTranslating?: boolean;
}

// ─── Simulated Mentor Reply Pool ───
const MENTOR_REPLIES: Record<string, string[]> = {
  "ta-IN": [
    "நல்ல கேள்வி! இதை நான் விளக்குகிறேன்.",
    "உங்கள் முன்னேற்றம் மிகவும் நன்றாக உள்ளது!",
    "இந்த கான்செப்ட்டை இன்னும் ஆழமாக பார்ப்போம்.",
    "அருமை, தொடருங்கள்!",
  ],
  "hi-IN": [
    "बहुत अच्छा सवाल! मैं समझाता हूँ।",
    "आपकी प्रगति बहुत बढ़िया है!",
    "इस कॉन्सेप्ट को और गहराई से समझते हैं।",
    "शाबाश, ऐसे ही आगे बढ़ते रहो!",
  ],
  "es-ES": [
    "¡Gran pregunta! Déjame explicarte.",
    "¡Tu progreso es excelente!",
    "Vamos a profundizar en este concepto.",
    "¡Muy bien, sigue así!",
  ],
  "ml-IN": [
    "നല്ല ചോദ്യം! ഞാൻ വിശദീകരിക്കാം.",
    "നിങ്ങളുടെ പുരോഗതി വളരെ നന്നായിട്ടുണ്ട്!",
    "ഈ ആശയം കൂടുതൽ ആഴത്തിൽ നോക്കാം.",
    "മിടുക്കൻ, ഇങ്ങനെ തുടരൂ!",
  ],
  "ar-SA": [
    "سؤال رائع! دعني أشرح لك.",
    "تقدمك ممتاز!",
    "دعنا نتعمق أكثر في هذا المفهوم.",
    "أحسنت، واصل هكذا!",
  ],
  "fr-FR": [
    "Excellente question ! Laissez-moi vous expliquer.",
    "Vos progrès sont remarquables !",
    "Approfondissons ce concept.",
    "Très bien, continuez comme ça !",
  ],
  "en-US": [
    "Great question! Let me explain.",
    "Your progress is excellent!",
    "Let's dive deeper into this concept.",
    "Well done, keep it up!",
  ],
};

export default function ChatPage() {
  const { profile } = useProfile();

  // Map profile language name to language code
  const getDefaultLangCode = () => {
    if (!profile?.preferredLanguage) return "en-US";
    const match = LANGUAGES.find(l => l.name.toLowerCase() === profile.preferredLanguage.toLowerCase());
    return match?.code || "en-US";
  };

  const [selectedMentor, setSelectedMentor] = useState<OnlineMentor | null>(null);
  const [userLanguage, setUserLanguage] = useState(getDefaultLangCode());
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const userLangName = LANGUAGES.find(l => l.code === userLanguage)?.name || "English";

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ─── HANDLE SELECT MENTOR ───
  const handleSelectMentor = (mentor: OnlineMentor) => {
    setSelectedMentor(mentor);
    setMessages([
      {
        id: "welcome",
        senderId: mentor.id,
        senderName: mentor.name,
        originalText: getWelcomeMessage(mentor.languageCode),
        originalLang: mentor.language,
        timestamp: new Date(),
      },
    ]);
  };

  const getWelcomeMessage = (langCode: string) => {
    const welcomes: Record<string, string> = {
      "ta-IN": "வணக்கம்! இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
      "hi-IN": "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूँ?",
      "es-ES": "¡Hola! ¿Cómo puedo ayudarte hoy?",
      "ml-IN": "നമസ്കാരം! ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കും?",
      "ar-SA": "مرحباً! كيف يمكنني مساعدتك اليوم؟",
      "fr-FR": "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
      "en-US": "Hello! How can I help you today?",
    };
    return welcomes[langCode] || welcomes["en-US"];
  };

  // ─── SEND MESSAGE (with auto-translate) ───
  const handleSend = async () => {
    if (!input.trim() || !selectedMentor || isSending) return;
    setIsSending(true);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: "mentee_1",
      senderName: "You",
      originalText: input,
      originalLang: userLangName,
      timestamp: new Date(),
      isTranslating: true,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Auto-translate user message into mentor's language
    try {
      const translated = await TranslationService.translateText(input, selectedMentor.language);
      setMessages(prev =>
        prev.map(m =>
          m.id === userMsg.id
            ? { ...m, translatedText: translated, translatedLang: selectedMentor!.language, isTranslating: false }
            : m
        )
      );
    } catch {
      setMessages(prev =>
        prev.map(m => (m.id === userMsg.id ? { ...m, isTranslating: false } : m))
      );
    }

    setIsSending(false);

    // Simulate mentor reply after 2 seconds
    setTimeout(async () => {
      const mentorLangCode = selectedMentor.languageCode;
      const replies = MENTOR_REPLIES[mentorLangCode] || MENTOR_REPLIES["en-US"];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const mentorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: selectedMentor.id,
        senderName: selectedMentor.name,
        originalText: randomReply,
        originalLang: selectedMentor.language,
        timestamp: new Date(),
        isTranslating: true,
      };

      setMessages(prev => [...prev, mentorMsg]);

      // Auto-translate mentor reply into user's language
      try {
        const translated = await TranslationService.translateText(randomReply, userLangName);
        setMessages(prev =>
          prev.map(m =>
            m.id === mentorMsg.id
              ? { ...m, translatedText: translated, translatedLang: userLangName, isTranslating: false }
              : m
          )
        );
      } catch {
        setMessages(prev =>
          prev.map(m => (m.id === mentorMsg.id ? { ...m, isTranslating: false } : m))
        );
      }
    }, 2000);
  };

  // ─── VOICE INPUT HANDLER ───
  const handleVoiceTranscript = (transcript: string) => {
    setInput(transcript);
  };

  // ─── AUTO-TRANSLATE WELCOME MESSAGE ───
  const handleTranslateWelcome = async (msgId: string, text: string) => {
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isTranslating: true } : m));
    try {
      const translated = await TranslationService.translateText(text, userLangName);
      setMessages(prev =>
        prev.map(m =>
          m.id === msgId ? { ...m, translatedText: translated, translatedLang: userLangName, isTranslating: false } : m
        )
      );
    } catch {
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isTranslating: false } : m));
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-20 pb-6 h-screen flex flex-col">
        {/* Header */}
        <header className="py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl">
                <Languages className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              Language Bridge Chat
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time translated conversations with your mentors</p>
          </div>

          {/* User Language Selector */}
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 hidden md:inline">I speak:</span>
            <select
              value={userLanguage}
              onChange={(e) => setUserLanguage(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* Main Chat Layout */}
        <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">

          {/* ─── LEFT: Online Mentors Sidebar ─── */}
          <aside className="w-72 flex-shrink-0 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-indigo-500" />
                Online Mentors
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Select a mentor to begin chatting</p>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
              {ONLINE_MENTORS.map((mentor) => (
                <button
                  key={mentor.id}
                  onClick={() => mentor.online && handleSelectMentor(mentor)}
                  disabled={!mentor.online}
                  className={`w-full text-left p-4 transition-all duration-200 group relative ${
                    selectedMentor?.id === mentor.id
                      ? "bg-indigo-50 dark:bg-indigo-900/30 border-r-4 border-indigo-500"
                      : mentor.online
                      ? "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      : "opacity-40 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar with status dot overlay */}
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-md ${
                        mentor.online
                          ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                          : "bg-gray-400"
                      }`}>
                        {mentor.avatar}
                      </div>
                      {/* Big visible status dot on avatar corner */}
                      <span className={`absolute -bottom-0.5 -right-0.5 block w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-800 ${
                        mentor.online ? "bg-green-500" : "bg-gray-400"
                      }`}>
                        {mentor.online && (
                          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
                        )}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-900 dark:text-white truncate">{mentor.name}</span>
                        {mentor.isPeer && (
                          <span className="px-1.5 py-0.5 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 text-[9px] font-bold rounded uppercase tracking-wider">Peer {mentor.avgScore}%</span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate flex items-center gap-1">
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${mentor.online ? "bg-green-500" : "bg-gray-400"}`}></span>
                        {mentor.online ? "Online" : "Offline"} • {mentor.isPeer ? mentor.specialty : mentor.language}
                      </p>
                    </div>
                    {selectedMentor?.id === mentor.id && (
                      <ChevronRight className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {/* ─── RIGHT: Chat Thread ─── */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col overflow-hidden">
            {!selectedMentor ? (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                  <Languages className="w-10 h-10 text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Start a Conversation</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                  Select an online mentor from the sidebar. Messages are automatically translated in real-time using AI.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {LANGUAGES.map(l => (
                    <span key={l.code} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300">
                      {l.flag} {l.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/80 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md ${selectedMentor.isPeer ? "bg-gradient-to-br from-teal-500 to-emerald-600" : "bg-gradient-to-br from-indigo-500 to-purple-600"}`}>
                    {selectedMentor.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">{selectedMentor.name}</h3>
                      {selectedMentor.isPeer && (
                        <span className="px-2 py-0.5 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 text-[9px] font-bold rounded-full uppercase tracking-wider">🎓 Peer Tutor • {selectedMentor.avgScore}%</span>
                      )}
                    </div>
                    <p className="text-[11px] text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                      <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                      Online • {selectedMentor.isPeer ? selectedMentor.specialty : `Speaks ${selectedMentor.language}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 rounded-full">
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">AI Translated</span>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => {
                    const isMe = msg.senderId === "mentee_1";
                    return (
                      <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                        {/* Sender Name */}
                        <span className={`text-[10px] font-bold mb-1 uppercase tracking-wider ${isMe ? "text-indigo-500" : "text-gray-400 dark:text-gray-500"}`}>
                          {msg.senderName} • {msg.originalLang}
                        </span>

                        {/* Bubble */}
                        <div className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                          isMe
                            ? "bg-indigo-500 text-white rounded-br-sm"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm"
                        }`}>
                          <p className="text-sm leading-relaxed">{msg.originalText}</p>

                          {/* Translation Block */}
                          {msg.isTranslating && (
                            <div className={`mt-2 pt-2 border-t ${isMe ? "border-white/20" : "border-gray-200 dark:border-gray-600"} text-xs italic flex items-center gap-1`}>
                              <span className="animate-pulse">{isMe ? "⏳" : "🔄"} Translating...</span>
                            </div>
                          )}
                          {msg.translatedText && (
                            <div className={`mt-2 pt-2 border-t ${isMe ? "border-white/20" : "border-gray-200 dark:border-gray-600"}`}>
                              <span className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isMe ? "text-indigo-200" : "text-indigo-500"}`}>
                                🌐 {msg.translatedLang}
                              </span>
                              <p className={`text-sm italic ${isMe ? "text-white/90" : "text-gray-700 dark:text-gray-300"}`}>
                                {msg.translatedText}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Translate button for messages without translation */}
                        {!isMe && !msg.translatedText && !msg.isTranslating && (
                          <button
                            onClick={() => handleTranslateWelcome(msg.id, msg.originalText)}
                            className="mt-1 text-[11px] text-indigo-500 hover:text-indigo-400 font-semibold flex items-center gap-1 transition-colors"
                          >
                            <Globe className="w-3 h-3" /> Translate to {userLangName}
                          </button>
                        )}

                        {/* Timestamp */}
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>

                {/* Input Bar */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/80">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder={`Type in ${userLangName}...`}
                        className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Voice Input */}
                    <VoiceInput onTranscript={handleVoiceTranscript} language={userLanguage} />

                    {/* Send Button */}
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isSending}
                      className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:hover:bg-indigo-500 text-white p-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 text-center">
                    🌐 Messages auto-translated via AI • 🎙️ Speak in {userLangName} using the mic button
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
