// components/dashboard/NoNextAppointments.tsx
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function NoNextAppointments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          Next Appointment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6 sm:py-8 text-muted-foreground">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted/30 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 opacity-50" />
          </div>
          <p className="text-xs sm:text-sm mb-2 sm:mb-3">No upcoming appointments</p>
          <Link href="/appointment">
            <Button size="sm" variant="outline" className="w-full text-xs sm:text-sm">
              Schedule Your Next Visit
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default NoNextAppointments;