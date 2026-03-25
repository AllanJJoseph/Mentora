# Mentora - Project Context

This file serves as a persistent context for Mentora, a platform designed to automate and enhance the mentorship lifecycle with AI-driven matching, engagement tracking, and session assistance.

## Project Vision
To create a scalable, rural-accessible, and Al-driven mentorship platform that ensures meaningful connections and long-term engagement.

## Tech Stack
- **Frontend**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Backend/DB**: Firebase (Firestore, Cloud Functions)
- **Authentication**: Firebase Auth
- **AI**: Gemini API (for matching explanations and session summaries)
- **Multilingual Support**: LibreTranslate / Translation APIs

## Core Components
1. **AI Smart Matching Engine**: Hybrid scoring system (deterministic + AI).
2. **Engagement Health Tracker**: Monitoring mentor-mentee interaction health.
3. **AI Session Assistant**: Automated summarization and action items from sessions.
4. **Leaderboard & Gamification**: Behavioral engineering to drive consistency.
5. **Language Bridge**: Breaking language barriers for rural accessibility.

## Current Progress
- [x] PRD Analysis and Extraction
- [x] Project Structure Initialization
- [x] Dependency Installation (Next.js, Tailwind, Firebase, Gemini API)
- [x] **Core Architecture Setup**: Custom `AuthContext` with mock fallback for demo mode.
- [x] **AI Smart Matching Engine**: Developed deterministic hybrid scoring and Gemini API dynamic explanations (`/matching-demo`).
- [x] **Engagement Health Tracker**: Created scoring based on session consistency, streaks, and missed sessions (`/health-demo`).
- [x] **AI Session Assistant**: Integrated Gemini 1.5 Flash to parse unstructured notes into structured action items (`/session-demo`).
- [x] **Leaderboard & Gamification**: Developed behavioral engineering rank logic and badges for both mentors/mentees (`/leaderboard-demo`).
- [x] **Language Bridge**: Set up simulated Gemini real-time translation chat interfaces (`/language-demo`).
- [x] **Voice-to-Text Support**: Implemented Web Speech API for voice input in chat interface.
- [x] **Admin Dashboard**: Aggregated system-wide active/at-risk metrics and interventions (`/admin`).
- [x] **Configure Nudges**: Created interface for customizing automated engagement interventions (`/nudges`).
- [x] **Unified Dashboard**: Created a cohesive user portal tying all features together (`/dashboard`).
- [x] **About Page**: Comprehensive feature showcase and platform vision (`/about`).
- [x] **User Settings**: Profile management, notifications, language preferences, and privacy settings (`/settings`).

## Project Structure (Key Files)
- `src/app/page.tsx`: Premium landing page with glassmorphism.
- `src/app/about/page.tsx`: Comprehensive about page showcasing all features and vision.
- `src/app/dashboard/page.tsx`: Unified hub for all features.
- `src/app/settings/page.tsx`: User profile and preferences management.
- `src/app/nudges/page.tsx`: Configure automated engagement nudges and interventions.
- `src/components/*`: Reusable components (`Navbar`, `HealthBadge`, `MatchCard`, `ChatInterface`, `SessionAssistant`, `LeaderboardRow`, `VoiceInput`).
- `src/context/AuthContext.tsx`: Manages Firebase authentication state (safely mocked without API keys).
- `src/lib/gemini.ts` & `src/lib/firebase.ts`: SDK initializers.
- `src/services/*`: Core logic (`adminService.ts`, `healthTrackerService.ts`, `leaderboardService.ts`, `matchingService.ts`, `sessionService.ts`, `translationService.ts`).
- `src/utils/mockData.ts`: Robust fake data enabling all demo pages to function locally without a live DB.

## Important Links & Resources
- PRD: (Refer to provided images)
- Platform Goal: Automation, Transparency, Accessibility.
- Local Dev: Run `npm run dev` and navigate to `http://localhost:3000`.

---
*Last Updated: 2026-03-25*
