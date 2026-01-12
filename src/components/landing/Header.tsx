"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const navLinks = [
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, cycleTheme } = useTheme();

  const getThemeIcon = () => {
    if (theme === "system") return <Monitor className="w-4 h-4" />;
    if (theme === "dark") return <Moon className="w-4 h-4" />;
    return <Sun className="w-4 h-4" />;
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.slice(1);
      const element = document.getElementById(targetId);

      if (element) {
        const headerOffset = 80;
        const y =
          element.getBoundingClientRect().top +
          window.pageYOffset -
          headerOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }

      setOpen(false);
      return;
    }

    setOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-50 border-b border-border backdrop-blur-sm bg-background/95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent transition-all duration-300 group-hover:from-primary/80 group-hover:to-primary/50">
              DentAssist Pro
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
            {navLinks.map((l) => (
              <a
                key={l.name}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="relative text-muted-foreground hover:text-foreground transition-colors font-medium group py-2 cursor-pointer"
              >
                {l.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Dashboard */}
            <SignedIn>
              <Link
                href="/dashboard"
                className="relative text-muted-foreground hover:text-foreground transition-colors font-medium group py-2"
              >
                Dashboard
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </Link>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="relative text-muted-foreground hover:text-foreground transition-colors font-medium group py-2">
                  Dashboard
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </button>
              </SignInButton>
            </SignedOut>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={cycleTheme}
              title={`Current theme: ${theme}. Click to cycle.`}
              className="p-2 rounded-md border border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground hover:scale-110 transition-all duration-300"
            >
              {getThemeIcon()}
            </button>

            {/* Auth (desktop) */}
            <div className="hidden sm:flex items-center gap-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 rounded-md bg-transparent border border-border text-foreground hover:bg-accent transition-all duration-300">
                    Login
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-medium">
                    Sign up
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9",
                    },
                  }}
                />
              </SignedIn>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-md border border-border hover:bg-accent transition-all duration-300"
            >
              <svg
                className="w-5 h-5 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
              >
                {open ? (
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
          <div className="px-4 pt-4 pb-4 space-y-3">
            {navLinks.map((l) => (
              <a
                key={l.name}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="block text-foreground hover:text-primary hover:translate-x-2 py-2 transition-all duration-300 font-medium cursor-pointer"
              >
                {l.name}
              </a>
            ))}

            {/* Dashboard (mobile) */}
            <SignedIn>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block text-foreground hover:text-primary hover:translate-x-2 py-2 transition-all duration-300 font-medium"
              >
                Dashboard
              </Link>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full text-left text-foreground hover:text-primary hover:translate-x-2 py-2 transition-all duration-300 font-medium"
                >
                  Dashboard
                </button>
              </SignInButton>
            </SignedOut>

            {/* Auth buttons (mobile) */}
            <div className="flex items-center gap-2 pt-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full px-3 py-2 rounded-md border border-border hover:bg-accent transition-all duration-300">
                    Login
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button className="w-full px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-medium">
                    Sign up
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
