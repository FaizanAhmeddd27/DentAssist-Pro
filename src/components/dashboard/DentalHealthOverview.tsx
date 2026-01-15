// components/dashboard/DentalHealthOverview.tsx
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserStats } from "@/lib/actions/appointments";

async function DentalHealthOverview() {
  const user = await currentUser();
  const stats = await getUserStats();

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
          <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          Your Dental Health
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Keep track of your dental care journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <div className="text-center p-3 sm:p-4 bg-muted/30 rounded-xl hover:bg-muted/40 transition-colors">
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
              {stats.completedAppointments}
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
              Completed Visits
            </div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-muted/30 rounded-xl hover:bg-muted/40 transition-colors">
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
              {stats.totalAppointments}
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
              Total Appointments
            </div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-muted/30 rounded-xl hover:bg-muted/40 transition-colors">
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
              {user?.createdAt ? format(new Date(user.createdAt), "MMM yy") : "-"}
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
              Member Since
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
          <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl border border-blue-500/20">
            <div className="text-lg sm:text-xl font-bold text-blue-500 mb-1">
              {stats.pendingAppointments}
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">
              Upcoming
            </div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-xl border border-orange-500/20">
            <div className="text-lg sm:text-xl font-bold text-orange-500 mb-1">
              {stats.cancelledAppointments}
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">
              Cancelled
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-primary mb-1 text-xs sm:text-sm">
                {stats.totalAppointments === 0 
                  ? "Ready to get started?" 
                  : "Continue your dental journey"}
              </h4>
              <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-2 sm:mb-3">
                {stats.totalAppointments === 0
                  ? "Book your first appointment or try our AI voice assistant for instant dental advice."
                  : "Book your next appointment or chat with our AI assistant for dental tips."}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link href="/voice" className="flex-1">
                  <Button 
                    size="sm" 
                    className="w-full bg-primary hover:bg-primary/90 text-xs sm:text-sm"
                  >
                    Try AI Assistant
                  </Button>
                </Link>
                <Link href="/appointment" className="flex-1">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full text-xs sm:text-sm"
                  >
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DentalHealthOverview;