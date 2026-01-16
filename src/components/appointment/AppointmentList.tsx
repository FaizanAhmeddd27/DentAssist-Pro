// components/appointment/AppointmentsList.tsx
"use client";

import React, { useMemo } from "react";
import { useGetAppointments } from "@/hooks/use-appointment";
import { Calendar, Loader2 } from "lucide-react";
import AppointmentCard from "./ApointmentCard";

interface AppointmentsListProps {
  filter: "upcoming" | "past" | "cancelled";
}

function AppointmentsList({ filter }: AppointmentsListProps) {
  const { data: allAppointments = [], isLoading } = useGetAppointments();
  
  const filteredAppointments = useMemo(() => {
    const now = new Date();
    
    return allAppointments.filter((apt: any) => {
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
  }, [allAppointments, filter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 sm:py-16">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading appointments...</p>
        </div>
      </div>
    );
  }

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
      {filteredAppointments.map((appointment: any) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
}

export default AppointmentsList;