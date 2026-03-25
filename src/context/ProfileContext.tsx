"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

// ─── Onboarding Profile Shape ───
export interface OnboardingProfile {
  fullName: string;
  role: "mentor" | "mentee";
  email: string;
  phone: string;
  age: string;
  location: string;
  preferredLanguage: string;
  bio: string;
  skills: string[];
  interests: string[];
  availability: string;
  educationLevel: string;
  goals: string;
  completedAt: string; // ISO date string
}

interface ProfileContextType {
  profile: OnboardingProfile | null;
  isOnboarded: boolean;
  loading: boolean;
  saveProfile: (profile: OnboardingProfile) => Promise<void>;
  clearProfile: () => void;
  getField: (field: keyof OnboardingProfile) => string | string[] | null;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  isOnboarded: false,
  loading: true,
  saveProfile: async () => {},
  clearProfile: () => {},
  getField: () => null,
});

const STORAGE_KEY = "mentora-user-profile";

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<OnboardingProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load profile: try Firestore first, fallback to localStorage
  const loadProfile = useCallback(async () => {
    setLoading(true);

    // 1. Try Firestore if user is logged in
    if (user?.uid) {
      try {
        const docRef = doc(db, "profiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as OnboardingProfile;
          setProfile(data);
          // Also cache in localStorage
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          setLoading(false);
          return;
        }
      } catch (error) {
        console.warn("Firestore read failed, falling back to localStorage:", error);
      }
    }

    // 2. Fallback to localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load profile from localStorage:", e);
    }

    setLoading(false);
  }, [user?.uid]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // Save profile to both Firestore AND localStorage
  const saveProfile = async (newProfile: OnboardingProfile) => {
    setProfile(newProfile);

    // Save to localStorage (always works)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));

    // Save to Firestore if user is logged in
    if (user?.uid) {
      try {
        const docRef = doc(db, "profiles", user.uid);
        await setDoc(docRef, {
          ...newProfile,
          uid: user.uid,
          updatedAt: new Date().toISOString(),
        });
        console.log("✅ Profile saved to Firestore");
      } catch (error) {
        console.warn("⚠️ Failed to save to Firestore (saved locally):", error);
      }
    }
  };

  const clearProfile = () => {
    setProfile(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getField = (field: keyof OnboardingProfile) => {
    return profile ? profile[field] : null;
  };

  const isOnboarded = !!profile?.completedAt;

  return (
    <ProfileContext.Provider value={{ profile, isOnboarded, loading, saveProfile, clearProfile, getField }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
