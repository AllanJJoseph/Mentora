"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/ProfileContext";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProfileProvider>
        {children}
      </ProfileProvider>
    </AuthProvider>
  );
}
