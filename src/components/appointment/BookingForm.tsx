// components/appointment/BookingForm.tsx
"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { createAppointment } from "@/lib/actions/appointments";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Calendar as CalendarIcon, Clock } from "lucide-react";
import TimeSlotPicker from "./TimeSlotPicker";

interface BookingFormProps {
  doctor: any;
  onSuccess: () => void;
}

function BookingForm({ doctor, onSuccess }: BookingFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast.error("Please select a date", {
        description: "Choose a date for your appointment"
      });
      return;
    }

    if (!time) {
      toast.error("Please select a time slot", {
        description: "Choose a time for your appointment"
      });
      return;
    }

    startTransition(async () => {
      const toastId = toast.loading("Booking your appointment...", {
        description: `With Dr. ${doctor.name}`
      });

      try {
        await createAppointment({
          doctorId: doctor.id,
          date: date,
          time: time,
          duration: 30,
          reason: reason || undefined,
          notes: notes || undefined,
        });
        
        toast.success("Appointment booked successfully!", {
          id: toastId,
          description: `Your appointment with Dr. ${doctor.name} is scheduled for ${date.toLocaleDateString()} at ${time}`
        });

        // Reset form
        setDate(undefined);
        setTime("");
        setReason("");
        setNotes("");
        
        router.push("/appointment");
        router.refresh();
        onSuccess();
      } catch (error) {
        toast.error("Failed to book appointment", {
          id: toastId,
          description: "Please try again or contact support"
        });
        console.error(error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date Picker */}
      <div>
        <Label className="mb-2 block flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-primary" />
          Select Date *
        </Label>
        <div className="border rounded-lg p-3 bg-muted/20">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today;
            }}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Time Slot Picker */}
      {date && (
        <div>
          <Label className="mb-2 block flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Select Time *
          </Label>
          <TimeSlotPicker selectedTime={time} onTimeSelect={setTime} />
        </div>
      )}

      {/* Reason */}
      <div>
        <Label htmlFor="reason" className="mb-2 block">
          Reason for Visit
        </Label>
        <Input
          id="reason"
          placeholder="e.g., Regular checkup, Toothache, Cleaning"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={isPending}
        />
      </div>

      {/* Notes */}
      <div>
        <Label htmlFor="notes" className="mb-2 block">
          Additional Notes (Optional)
        </Label>
        <Textarea
          id="notes"
          placeholder="Any additional information you'd like the doctor to know..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          disabled={isPending}
        />
      </div>

      {/* Selected Summary */}
      {date && time && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm font-semibold text-primary mb-2">Appointment Summary</p>
          <div className="space-y-1 text-sm">
            <p><strong>Doctor:</strong> Dr. {doctor.name}</p>
            <p><strong>Date:</strong> {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Duration:</strong> 30 minutes</p>
          </div>
        </div>
      )}

      <Button 
        type="submit" 
        disabled={isPending || !date || !time} 
        className="w-full" 
        size="lg"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Booking Appointment...
          </>
        ) : (
          "Confirm Booking"
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        You will receive a confirmation email after booking
      </p>
    </form>
  );
}

export default BookingForm;