// components/dashboard/MainActions.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { MessageSquare, Calendar, Check } from "lucide-react";
import Link from "next/link";

export default function MainActions() {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12">
      {/* AI Voice Assistant */}
      <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardContent className="relative p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">AI Voice Assistant</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Get instant dental advice through voice calls</p>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span className="text-xs sm:text-sm">24/7 availability</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span className="text-xs sm:text-sm">Professional dental guidance</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span className="text-xs sm:text-sm">Instant pain relief advice</span>
            </div>
          </div>

          <Link
            href="/voice"
            className={buttonVariants({
              variant: "default",
              className:
                "w-full mt-4 sm:mt-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-2.5 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300",
            })}
          >
            <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Start Voice Call
          </Link>
        </CardContent>
      </Card>

      {/* Book Appointment */}
      <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardContent className="relative p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Book Appointment</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Schedule with verified dentists in your area</p>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span className="text-xs sm:text-sm">Verified dental professionals</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span className="text-xs sm:text-sm">Flexible scheduling</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span className="text-xs sm:text-sm">Instant confirmations</span>
            </div>
          </div>

          <Link href="/appointment">
            <Button
              variant="outline"
              className="w-full mt-4 sm:mt-6 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 font-semibold py-2.5 sm:py-3 rounded-xl transition-all duration-300"
            >
              <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Schedule Now
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}