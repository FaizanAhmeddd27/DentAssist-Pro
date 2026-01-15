// components/dashboard/WelcomeSection.tsx
import { currentUser } from "@clerk/nextjs/server";
import { Sparkles } from "lucide-react";

export default async function WelcomeSection() {
  const user = await currentUser();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  return (
    <div className="relative z-10 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-primary/20 mb-6 sm:mb-8 md:mb-12 overflow-hidden">
      <div className="space-y-3 sm:space-y-4 flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:py-1.5 bg-primary/10 rounded-full border border-primary/20">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-medium text-primary">Online & Ready</span>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
            Good {getGreeting()}, {user?.firstName}!
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Your personal AI dental assistant is ready to help you maintain perfect oral health.
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full ml-4">
        <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-primary" />
      </div>
    </div>
  );
}