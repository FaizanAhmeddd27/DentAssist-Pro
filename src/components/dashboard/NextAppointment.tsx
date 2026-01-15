// components/dashboard/NextAppointment.tsx
import NoNextAppointments from "./NoNextAppointment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User, Stethoscope } from "lucide-react";
import { getNextAppointment } from "@/lib/actions/appointments";
import { format } from "date-fns";

async function NextAppointment() {
  const nextAppointment = await getNextAppointment();

  if (!nextAppointment) return <NoNextAppointments />;

  const appointmentDate = new Date(nextAppointment.date);
  const isToday = new Date().toDateString() === appointmentDate.toDateString();

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          Next Appointment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium text-primary">
              {isToday ? "Today" : "Upcoming"}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            {nextAppointment.status}
          </span>
        </div>

        {/* Appointment Details */}
        <div className="space-y-2 sm:space-y-3">
          {nextAppointment.doctor && (
            <>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-xs sm:text-sm truncate">
                    Dr. {nextAppointment.doctor.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                    {nextAppointment.reason || "Dental Appointment"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-xs sm:text-sm truncate">
                    {nextAppointment.doctor.specialty}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    Specialty
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-xs sm:text-sm">
                {format(appointmentDate, "MMMM d, yyyy")}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                {format(appointmentDate, "EEEE")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-xs sm:text-sm">
                {nextAppointment.time}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                {nextAppointment.duration} minutes
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default NextAppointment;