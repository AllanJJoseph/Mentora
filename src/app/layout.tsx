import type { Metadata } from "next";
import ClientProvider from "@/components/ClientProvider";
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
      <body className="antialiased">
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
