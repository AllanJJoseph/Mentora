"use client";

import { useEffect, useState, createContext, useContext } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ─── SIGN IN ───
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Check Firestore for an existing profile (source of truth)
      try {
        const docRef = doc(db, "profiles", result.user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          // Profile exists in Firestore — cache it locally and go to dashboard
          const profileData = docSnap.data();
          localStorage.setItem("mentora-user-profile", JSON.stringify(profileData));
          const role = profileData.role || "mentee";
          router.push(role === "mentor" ? "/dashboard/mentor" : "/dashboard/mentee");
        } else {
          // No profile in Firestore — user needs to complete onboarding
          router.push("/onboarding");
        }
      } catch (firestoreError) {
        console.warn("Firestore check failed, falling back to localStorage:", firestoreError);
        // Fallback: check localStorage
        const profile = localStorage.getItem("mentora-user-profile");
        router.push(profile ? "/dashboard/mentee" : "/onboarding");
      }
    } catch (error: any) {
      setLoading(false);
      // Map Firebase error codes to friendly messages
      const code = error?.code || "";
      if (code === "auth/user-not-found") throw new Error("No account found with this email. Please sign up first.");
      if (code === "auth/wrong-password" || code === "auth/invalid-credential") throw new Error("Incorrect password. Please try again.");
      if (code === "auth/invalid-email") throw new Error("Invalid email address.");
      if (code === "auth/too-many-requests") throw new Error("Too many failed attempts. Please try again later.");
      throw new Error(error.message || "Failed to sign in.");
    }
  };

  // ─── SIGN UP ───
  const signup = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      // After signup, always go to onboarding
      router.push("/onboarding");
    } catch (error: any) {
      setLoading(false);
      const code = error?.code || "";
      if (code === "auth/email-already-in-use") throw new Error("An account with this email already exists. Try signing in.");
      if (code === "auth/invalid-email") throw new Error("Invalid email address.");
      if (code === "auth/weak-password") throw new Error("Password must be at least 6 characters.");
      throw new Error(error.message || "Failed to create account.");
    }
  };

  // ─── SIGN OUT ───
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
