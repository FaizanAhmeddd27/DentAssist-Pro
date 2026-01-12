"use client";

import * as React from "react";
import { ClerkProvider } from "@clerk/nextjs";

function useIsDarkFromHtmlClass() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const root = document.documentElement;

    const compute = () => {
      setIsDark(root.classList.contains("dark"));
    };

    compute();

    const obs = new MutationObserver(compute);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => obs.disconnect();
  }, []);

  return isDark;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const isDark = useIsDarkFromHtmlClass();

  return (
    <ClerkProvider
      appearance={{
        // We don't rely on @clerk/themes; instead we drive everything from your CSS vars.
        // When you toggle html.dark, your CSS vars change, and Clerk matches automatically.
        variables: {
          colorPrimary: "hsl(var(--primary))",
          colorBackground: "hsl(var(--background))",
          colorText: "hsl(var(--foreground))",
          colorInputBackground: "hsl(var(--background))",
          colorInputText: "hsl(var(--foreground))",
          borderRadius: "12px",
        },
        elements: {
          // Modal + card surface
          modalContent: "bg-card text-card-foreground border border-border shadow-2xl",
          card: "bg-card text-card-foreground border border-border shadow-2xl",

          // Headings
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",

          // Social auth buttons
          socialButtonsBlockButton:
            "border border-border bg-background text-foreground hover:bg-accent",
          socialButtonsBlockButtonText: "text-foreground",

          // Divider
          dividerLine: "bg-border",
          dividerText: "text-muted-foreground",

          // Inputs
          formFieldLabel: "text-foreground",
          formFieldInput:
            "bg-background text-foreground border border-border focus:ring-2 focus:ring-primary",

          // Primary button
          formButtonPrimary:
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",

          // Links
          footerActionLink: "text-primary hover:text-primary/80",

          // Small polish (optional)
          identityPreviewText: "text-foreground",
          formFieldHintText: "text-muted-foreground",
          formFieldErrorText: "text-destructive",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
