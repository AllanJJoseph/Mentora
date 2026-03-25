"use client";

import { useState } from "react";
import { TranslationService } from "@/services/translationService";
import VoiceInput from "./VoiceInput";

interface Message {
  id: string;
  senderId: string;
  text: string;
  originalLanguage: string;
  translatedText?: string;
  isTranslating: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'mentor_1',
      text: "Hola Allan, ¿cómo va tu proyecto de React?",
      originalLanguage: "es",
      isTranslating: false
    }
  ]);
  const [input, setInput] = useState("");
  const [targetLang, setTargetLang] = useState("English");
  const currentUserId = "mentee_1";

  const handleVoiceTranscript = (transcript: string) => {
    setInput(transcript);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      text: input,
      originalLanguage: "en", // Assuming mentee types in English
      isTranslating: false
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  const handleTranslate = async (messageId: string, text: string) => {
    // Optimistic UI update
    setMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, isTranslating: true } : m
    ));

    const translated = await TranslationService.translateText(text, targetLang);

    setMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, translatedText: translated, isTranslating: false } : m
    ));
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col h-[600px]">
      <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Sarah Chen (Mentor)
          </h3>
          <p className="text-xs text-white/40">Speaks: Spanish, English</p>
        </div>
        <select 
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="English">Translate to English</option>
          <option value="Spanish">Translate to Spanish</option>
          <option value="Hindi">Translate to Hindi</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                isMe ? 'bg-indigo-500 text-white rounded-tr-sm' : 'bg-white/10 text-white rounded-tl-sm'
              }`}>
                <p className="min-w-[120px]">{msg.text}</p>
                
                {msg.translatedText && (
                  <div className="mt-3 pt-3 border-t border-white/10 border-dashed text-sm text-white/80 italic">
                    <span className="text-indigo-300 text-[10px] uppercase font-bold tracking-widest block mb-1">Translation</span>
                    {msg.translatedText}
                  </div>
                )}
              </div>
              
              {!isMe && !msg.translatedText && (
                <button 
                  onClick={() => handleTranslate(msg.id, msg.text)}
                  disabled={msg.isTranslating}
                  className="text-xs text-indigo-400 hover:text-indigo-300 mt-2 font-medium flex items-center gap-1 transition-colors"
                >
                  {msg.isTranslating ? (
                    <span className="animate-pulse">Translating...</span>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
                      See Translation
                    </>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <VoiceInput onTranscript={handleVoiceTranscript} language="en-US" />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white px-6 rounded-xl font-bold transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}
