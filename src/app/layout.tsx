import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import TanstackProvider from "@/providers/TanstackProvider";
import UserSync from "@/components/UserSync";
import { ThemeProvider } from "@/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DentAssist Pro",
  description: "AI-powered dental assistant for smarter oral care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
          appearance={{
            variables: {
              colorText: "#6b46c1",
              colorTextSecondary: "#8b5cf6",
            },
          }}
        >
          <ThemeProvider>
          <TanstackProvider>
            <UserSync />
            {children}
          </TanstackProvider>
        </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
