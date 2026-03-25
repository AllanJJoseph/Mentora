import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only if we have an API key (prevents 500 errors in demo mode)
const hasValidConfig = typeof window !== 'undefined' ? !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY : !!firebaseConfig.apiKey;
const app = hasValidConfig 
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)) 
  : ({ name: 'MOCK_APP' } as any);

export const auth = hasValidConfig ? getAuth(app) : ({} as any);
export const db = hasValidConfig ? getFirestore(app) : ({} as any);
export const functions = hasValidConfig ? getFunctions(app) : ({} as any);

export default app;
