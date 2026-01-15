// components/appointment/TimeSlotPicker.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface TimeSlotPickerProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

function TimeSlotPicker({ selectedTime, onTimeSelect }: TimeSlotPickerProps) {
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00"
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
      {timeSlots.map((slot) => (
        <Button
          key={slot}
          type="button"
          variant={selectedTime === slot ? "default" : "outline"}
          onClick={() => onTimeSelect(slot)}
          className="w-full"
        >
          {slot}
        </Button>
      ))}
    </div>
  );
}

export default TimeSlotPicker;