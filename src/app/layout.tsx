import type { Metadata } from "next";
import ClientProvider from "@/components/ClientProvider";
import { ScheduleProvider } from "@/context/ScheduleContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mentora - AI-Powered Mentorship",
  description: "A full mentorship lifecycle platform connecting mentors and mentees with Al-driven engagement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 dark:bg-gray-900 transition-colors">
        <ClientProvider>
          <ScheduleProvider>
            {children}
          </ScheduleProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
