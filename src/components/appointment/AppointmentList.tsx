// components/appointment/AppointmentsList.tsx
import React from "react";
import { getUserAppointments } from "@/lib/actions/appointments";
import { Calendar } from "lucide-react";
import AppointmentCard from "./ApointmentCard";

interface AppointmentsListProps {
  filter: "upcoming" | "past" | "cancelled";
}

async function AppointmentsList({ filter }: AppointmentsListProps) {
  const allAppointments = await getUserAppointments();
  
  const now = new Date();
  
  const filteredAppointments = allAppointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    
    if (filter === "upcoming") {
      return (
        (apt.status === "SCHEDULED" || apt.status === "CONFIRMED") &&
        aptDate >= now
      );
    } else if (filter === "past") {
      return apt.status === "COMPLETED" || aptDate < now;
    } else {
      return apt.status === "CANCELLED" || apt.status === "NO_SHOW";
    }
  });

  if (filteredAppointments.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground opacity-50" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2">No appointments found</h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-6">
          {filter === "upcoming" && "You don't have any upcoming appointments"}
          {filter === "past" && "You don't have any past appointments"}
          {filter === "cancelled" && "You don't have any cancelled appointments"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6">
      {filteredAppointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
}

export default AppointmentsList;