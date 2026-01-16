"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Sparkles,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

interface AppointmentConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentData: {
    doctorName: string;
    doctorSpecialty: string;
    date: Date;
    time: string;
    duration: number;
    reason?: string;
    userEmail: string;
  };
}

export function AppointmentConfirmationModal({
  open,
  onOpenChange,
  appointmentData,
}: AppointmentConfirmationModalProps) {
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

  const formattedDate = formatDate(appointmentData.date);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-2 border-primary/20 bg-background">
        {/* Success Header */}
        <div className="relative bg-primary p-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            
            <DialogTitle className="text-3xl sm:text-4xl font-bold mb-2 text-white">
              Appointment Confirmed
            </DialogTitle>
            
            <DialogDescription className="text-white/90 text-lg">
              Your appointment has been successfully scheduled
            </DialogDescription>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 bg-background">
          {/* Email Notification Badge */}
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
            <Mail className="w-5 h-5 text-primary" />
            <p className="text-sm font-medium">
              Confirmation email sent to{" "}
              <span className="text-primary font-semibold">
                {appointmentData.userEmail}
              </span>
            </p>
          </div>

          {/* Appointment Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Appointment Details</h3>
            </div>

            <div className="grid gap-4">
              {/* Doctor Info */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">Doctor</p>
                  <p className="font-bold text-lg">Dr. {appointmentData.doctorName}</p>
                  <p className="text-sm text-muted-foreground">{appointmentData.doctorSpecialty}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="font-bold text-lg">
                    {formattedDate.full}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formattedDate.short}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">Time & Duration</p>
                  <p className="font-bold text-lg">{appointmentData.time}</p>
                  <p className="text-sm text-muted-foreground">{appointmentData.duration} minutes</p>
                </div>
              </div>

              {/* Reason (if provided) */}
              {appointmentData.reason && (
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Reason for Visit</p>
                  <p className="font-medium">{appointmentData.reason}</p>
                </div>
              )}
            </div>
          </div>

          {/* Important Notice */}
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1 text-sm">
                <p className="font-semibold">
                  Important Reminders
                </p>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Please arrive 10 minutes early</li>
                  <li>• Bring your insurance card and ID</li>
                  <li>• Cancel at least 24 hours in advance if needed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link href="/appointment" className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                onClick={() => onOpenChange(false)}
              >
                View All Appointments
              </Button>
            </Link>
            
            <Link href="/dashboard" className="flex-1">
              <Button 
                className="w-full bg-primary hover:bg-primary/90 group"
                onClick={() => onOpenChange(false)}
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}