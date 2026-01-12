"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>("system");

  // Load saved theme once
  React.useEffect(() => {
    const saved = localStorage.getItem("theme-mode") as Theme | null;
    if (saved) setTheme(saved);
  }, []);

  // Apply theme globally
  React.useEffect(() => {
    const root = document.documentElement;

    const apply = (t: Theme) => {
      if (t === "dark") root.classList.add("dark");
      else if (t === "light") root.classList.remove("dark");
      else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", prefersDark);
      }
    };

    apply(theme);
    localStorage.setItem("theme-mode", theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme((t) => (t === "system" ? "dark" : t === "dark" ? "light" : "system"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
