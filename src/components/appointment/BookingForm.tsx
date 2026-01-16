// components/appointment/BookingForm.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useCreateAppointment } from "@/hooks/use-appointment";
import { Loader2, Calendar as CalendarIcon, Clock, Check } from "lucide-react";
import TimeSlotPicker from "./TimeSlotPicker";
import { AppointmentConfirmationModal } from "./AppointmentConfirmationModal";
import { useUser } from "@clerk/nextjs";

interface BookingFormProps {
  doctor: any;
  onSuccess: () => void;
}

// Format date manually
const formatDate = (date: Date) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  return {
    full: `${dayName}, ${monthName} ${day}, ${year}`,
    short: `${monthName.slice(0, 3)} ${day}, ${year}`
  };
};

function BookingForm({ doctor, onSuccess }: BookingFormProps) {
  const { user } = useUser();
  const createAppointment = useCreateAppointment();
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>(null);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setTime("");
  };

  const handleTimeSelect = (newTime: string) => {
    setTime(newTime);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time) {
      return;
    }

    createAppointment.mutate(
      {
        doctorId: doctor.id,
        date: date,
        time: time,
        duration: 30,
        reason: reason || undefined,
        notes: notes || undefined,
      },
      {
        onSuccess: () => {
          // Set appointment data for modal
          setAppointmentData({
            doctorName: doctor.name,
            doctorSpecialty: doctor.specialty,
            date: date,
            time: time,
            duration: 30,
            reason: reason,
            userEmail: user?.emailAddresses[0]?.emailAddress || "",
          });

          // Show confirmation modal
          setShowConfirmationModal(true);

          // Reset form
          setDate(undefined);
          setTime("");
          setReason("");
          setNotes("");
        },
      }
    );
  };

  const handleModalClose = () => {
    setShowConfirmationModal(false);
    onSuccess();
  };

  const formattedDate = date ? formatDate(date) : null;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Picker */}
        <div>
          <Label className="mb-3 block flex items-center gap-2 text-base font-semibold">
            <CalendarIcon className="w-5 h-5 text-primary" />
            Select Date *
          </Label>
          <div className="border rounded-xl p-4 bg-muted/20">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
              className="rounded-lg mx-auto"
              fromDate={new Date()}
            />
          </div>
          {date && formattedDate && (
            <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                Selected: {formattedDate.full}
              </span>
            </div>
          )}
        </div>

        {/* Time Slot Picker */}
        {date && (
          <div>
            <Label className="mb-3 block flex items-center gap-2 text-base font-semibold">
              <Clock className="w-5 h-5 text-primary" />
              Select Time *
            </Label>
            <TimeSlotPicker selectedTime={time} onTimeSelect={handleTimeSelect} />
            {time && (
              <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  Selected: {time}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Reason */}
        <div>
          <Label htmlFor="reason" className="mb-2 block text-base font-semibold">
            Reason for Visit (Optional)
          </Label>
          <Input
            id="reason"
            placeholder="e.g., Regular checkup, Toothache, Cleaning"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={createAppointment.isPending}
            className="h-11"
          />
        </div>

        {/* Notes */}
        <div>
          <Label htmlFor="notes" className="mb-2 block text-base font-semibold">
            Additional Notes (Optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Any additional information you'd like the doctor to know..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            disabled={createAppointment.isPending}
          />
        </div>

        {/* Summary */}
        {date && time && formattedDate && (
          <div className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl">
            <p className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Appointment Summary
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Doctor:</span>
                <span className="font-semibold">Dr. {doctor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Specialty:</span>
                <span className="font-semibold">{doctor.specialty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-semibold">{formattedDate.short}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-semibold">{time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-semibold">30 minutes</span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={createAppointment.isPending || !date || !time}
          className="w-full h-12" 
          size="lg"
        >
          {createAppointment.isPending ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Booking Appointment...
            </>
          ) : (
            <>
              <CalendarIcon className="w-5 h-5 mr-2" />
              {!date ? "Select a Date First" : !time ? "Select a Time Slot" : "Confirm Booking"}
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          You will receive a confirmation email after booking
        </p>
      </form>

      {/* Confirmation Modal */}
      {appointmentData && (
        <AppointmentConfirmationModal
          open={showConfirmationModal}
          onOpenChange={handleModalClose}
          appointmentData={appointmentData}
        />
      )}
    </>
  );
}

export default BookingForm;