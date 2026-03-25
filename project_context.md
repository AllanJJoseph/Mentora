# Mentora - Project Context

This file serves as a persistent context for Mentora, a platform designed to automate and enhance the mentorship lifecycle with AI-driven matching, engagement tracking, and session assistance.

## Project Vision
To build an AI-powered mentorship lifecycle platform that not only connects mentors and mentees but ensures consistent engagement, measurable growth, and scalable impact, specifically catering to underserved and rural communities (e.g., Agaram Foundation).

## Tech Stack & Architecture
- **Frontend**: [Next.js App Router](https://nextjs.org/) (TypeScript, [Tailwind CSS](https://tailwindcss.com/))
- **Backend/DB**: [Firebase Firestore & Cloud Functions](https://firebase.google.com/)
- **Authentication**: Firebase Auth (Role-based access: Mentor, Mentee, Admin)
- **AI Intelligence Layer**: [Google Gemini API](https://deepmind.google/technologies/gemini/) (Automated matching explanations, session transcription, and action item generation)
- **External Integrations**: [Twilio SMS](https://www.twilio.com/) (low-bandwidth offline nudges), Web Speech API (Voice-to-text), [Google Translate API](https://cloud.google.com/translate) (Cross-language bridge)

## Target Personas
1. **Mentee (Student)**: Needs structured learning but faces language and connectivity constraints.
2. **Mentor (Volunteer)**: Needs easy scheduling and visibility into the mentee's progress without administrative burden.
3. **Admin (NGO)**: Needs to monitor engagement, track outcomes, and intervene when matches are "At-Risk".

## Core Systems & Features (With Local Links)
1. **AI Smart Matching Engine** ([`/matching-demo`](http://localhost:3000/matching-demo)): A deterministic + AI hybrid scoring algorithm factoring in skills, language, location, and availability to output a Match Score and an AI-generated explanation.
2. **Engagement Health Tracker** ([`/health-demo`](http://localhost:3000/health-demo)): A dynamic metric system categorizing relationships as Active (🟢), At-Risk (🟡), or Inactive (🔴) based on session frequency, duration, and streaks.
3. **AI Session Assistant** ([`/session-demo`](http://localhost:3000/session-demo)): Converts unstructured session notes or voice inputs directly into structured summaries and action items.
4. **Leaderboard & Gamification** ([`/leaderboard-demo`](http://localhost:3000/leaderboard-demo)): Behavioral engineering through Mentor and Mentee ranking formulas, streaks, and Badges (Top Mentor, Fast Learner) to drive week-over-week consistency.
5. **Language Bridge & Voice** ([`/language-demo`](http://localhost:3000/language-demo)): Democratizing access by combining real-time translations with voice-to-text input, allowing a tech executive to seamlessly mentor a rural student in their native tongue.
6. **Smart Nudging System** ([`/nudges`](http://localhost:3000/nudges)): Automated triggers (via App or SMS) to re-engage users when sessions are missed or inactivity is detected.
7. **Admin Dashboard** ([`/admin`](http://localhost:3000/admin)): System-wide analytics for NGOs to monitor engagement.
8. **Unified Dashboard Hub** ([`/dashboard`](http://localhost:3000/dashboard)): The central user portal tying all features together.

## Important Links & Resources
- **GitHub Repository**: [AllanJJoseph/Mentora](https://github.com/AllanJJoseph/Mentora.git)
- **Main Landing Page**: [http://localhost:3000](http://localhost:3000)
- **Platform Goal**: Automation, Transparency, Accessibility specifically for NGOs like Agaram Foundation.

---
*Last Updated: 2026-03-25*
