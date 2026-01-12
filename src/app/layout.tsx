import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs'
import { User } from "lucide-react";
import UserSync from "@/components/UserSync"

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
    <ClerkProvider 
        afterSignInUrl="/dashboard"
        afterSignUpUrl="/dashboard"
       appearance={{
        variables: {
          colorText: '#6b46c1', // Dark purple color
          colorTextSecondary: '#8b5cf6', // Lighter purple for secondary text
        },
      }}
  >
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserSync/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
