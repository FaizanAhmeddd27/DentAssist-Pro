"use client";

import React from "react";
import { useGetDoctors } from "@/hooks/use-appointment";
import DoctorCard from "./DoctorCard";
import { Stethoscope, Loader2 } from "lucide-react";

function DoctorsList() {
  const { data: doctors = [], isLoading } = useGetDoctors();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 sm:py-16">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Stethoscope className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground opacity-50" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2">No doctors available</h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          Please check back later
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {doctors.map((doctor: any) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}

export default DoctorsList;