# Mentora Setup Guide

## API Configuration

### 1. Firebase Setup (5 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one:
   - Click "Add project"
   - Enter "Mentora" as project name
   - Disable Google Analytics (optional)
   - Click "Create project"

3. Add a Web App:
   - Click the web icon (</>)
   - Register app name: "Mentora Web"
   - Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"
   - **Copy the firebaseConfig object values**

4. Enable Authentication:
   - Go to "Authentication" in left sidebar
   - Click "Get started"
   - Click "Sign-in method" tab
   - Enable "Email/Password"
   - Click "Save"

5. Enable Firestore Database:
   - Go to "Firestore Database" in left sidebar
   - Click "Create database"
   - Select "Start in test mode" for development
   - Choose your location
   - Click "Enable"

6. Update your `.env` file with Firebase config values:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 2. Gemini API Setup (2 minutes)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Select your Google Cloud project or create a new one
5. Copy the API key

6. Update your `.env` file:
```env
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Restart Development Server

After updating `.env`:
```bash
# Stop the server (Ctrl+C)
# Restart it
npm run dev
```

## Development Commands

```bash
# Start development server
npm run dev

# Build production version
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Features Overview

### Core Features (All Functional)
- ✅ **AI Smart Matching**: Real-time mentor-mentee matching with AI explanations
- ✅ **Health Tracking**: Automated relationship health monitoring
- ✅ **Session Assistant**: AI-powered session notes and action items
- ✅ **Gamification**: Leaderboards, badges, and streak tracking
- ✅ **Language Bridge**: Real-time translation + voice input
- ✅ **Admin Dashboard**: System-wide metrics and interventions
- ✅ **Configure Nudges**: Automated engagement interventions
- ✅ **User Settings**: Profile, notifications, preferences

### Demo Pages
- `/` - Professional landing page
- `/dashboard` - Unified user dashboard
- `/matching-demo` - AI matching demonstration
- `/health-demo` - Relationship health tracking
- `/session-demo` - Session assistant
- `/leaderboard-demo` - Gamification system
- `/language-demo` - Translation + voice input
- `/admin` - Admin analytics
- `/nudges` - Configure automated nudges
- `/settings` - User settings
- `/about` - Feature showcase

## API Integration Notes

### Without API Keys
- App works with mock data
- All features are demonstrated
- Perfect for development and presentations

### With API Keys
- Live AI explanations (Gemini)
- Real-time authentication (Firebase)
- Cloud database storage (Firestore)
- Production-ready functionality

## Professional UI Theme

The app now features a corporate/enterprise design:
- Clean white backgrounds
- Professional blue color palette (#3b82f6, #2563eb)
- Minimal animations
- Clear typography
- Business-focused layouts
- Subtle shadows and borders
- Traditional navigation patterns

## Troubleshooting

### Port Already in Use
If port 3000 is in use, Next.js will automatically try 3001.

### API Keys Not Working
1. Ensure `.env` file is in root directory
2. Check for typos in variable names
3. Restart development server after changes
4. Check Firebase project settings match

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Security Notes

- Never commit `.env` file to git (already in .gitignore)
- Use environment variables for all secrets
- Use Firebase security rules in production
- Enable 2FA on Firebase and Google Cloud accounts

## Support

For issues or questions:
- Check console for error messages
- Verify API keys are correctly formatted
- Ensure Firebase project is properly configured
- Review Firebase and Gemini API quotas/limits
