// components/appointment/AppointmentCard.tsx
"use client";

import React, { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Stethoscope, MoreVertical, X, Check, Trash2 } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { updateAppointmentStatus, deleteAppointment } from "@/lib/actions/appointments";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AppointmentCardProps {
  appointment: any;
}

function AppointmentCard({ appointment }: AppointmentCardProps) {
  const [isPending, startTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const router = useRouter();
  
  const appointmentDate = new Date(appointment.date);
  const isUpcoming = appointmentDate >= new Date() && 
    (appointment.status === "SCHEDULED" || appointment.status === "CONFIRMED");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "CONFIRMED":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "COMPLETED":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "CANCELLED":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "NO_SHOW":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default:
        return "bg-muted/50 text-muted-foreground border-border";
    }
  };

  const handleConfirm = () => {
    startTransition(async () => {
      const toastId = toast.loading("Confirming appointment...");
      try {
        await updateAppointmentStatus(appointment.id, "CONFIRMED");
        toast.success("Appointment confirmed successfully!", { id: toastId });
        router.refresh();
      } catch (error) {
        toast.error("Failed to confirm appointment. Please try again.", { id: toastId });
        console.error(error);
      }
    });
  };

  const handleCancel = () => {
    startTransition(async () => {
      const toastId = toast.loading("Cancelling appointment...");
      try {
        await updateAppointmentStatus(appointment.id, "CANCELLED");
        toast.success("Appointment cancelled successfully", { id: toastId });
        setShowCancelDialog(false);
        router.refresh();
      } catch (error) {
        toast.error("Failed to cancel appointment. Please try again.", { id: toastId });
        console.error(error);
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const toastId = toast.loading("Deleting appointment...");
      try {
        await deleteAppointment(appointment.id);
        toast.success("Appointment deleted successfully", { id: toastId });
        setShowDeleteDialog(false);
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete appointment. Please try again.", { id: toastId });
        console.error(error);
      }
    });
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center overflow-hidden">
                {appointment.doctor?.imageUrl ? (
                  <Image
                    src={appointment.doctor.imageUrl}
                    alt={appointment.doctor.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                )}
              </div>
            </div>

            {/* Appointment Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold mb-1 truncate">
                    Dr. {appointment.doctor?.name || "Unknown"}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Stethoscope className="w-4 h-4" />
                    <span className="truncate">{appointment.doctor?.specialty || "Dentist"}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 sm:px-3 py-1 rounded-full border whitespace-nowrap ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={isPending}>
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {appointment.status === "SCHEDULED" && (
                        <>
                          <DropdownMenuItem onClick={handleConfirm} disabled={isPending}>
                            <Check className="w-4 h-4 mr-2" />
                            Confirm Appointment
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      {isUpcoming && (
                        <>
                          <DropdownMenuItem 
                            onClick={() => setShowCancelDialog(true)} 
                            disabled={isPending}
                            className="text-orange-600 focus:text-orange-600"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel Appointment
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem 
                        onClick={() => setShowDeleteDialog(true)} 
                        disabled={isPending}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Appointment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{format(appointmentDate, "MMM dd, yyyy")}</p>
                    <p className="text-xs text-muted-foreground truncate">{format(appointmentDate, "EEEE")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{appointment.time}</p>
                    <p className="text-xs text-muted-foreground truncate">{appointment.duration} minutes</p>
                  </div>
                </div>
              </div>

              {appointment.reason && (
                <div className="p-3 bg-muted/30 rounded-lg mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Reason for visit</p>
                  <p className="text-sm">{appointment.reason}</p>
                </div>
              )}

              {appointment.notes && (
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm">{appointment.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Action Buttons */}
          {isUpcoming && (
            <div className="flex gap-2 mt-4 sm:hidden">
              {appointment.status === "SCHEDULED" && (
                <Button 
                  onClick={handleConfirm} 
                  disabled={isPending}
                  size="sm"
                  className="flex-1"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Confirm
                </Button>
              )}
              <Button 
                onClick={() => setShowCancelDialog(true)} 
                disabled={isPending}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this appointment with Dr. {appointment.doctor?.name}? 
              This action can be reversed by rebooking.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>No, keep it</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancel} 
              disabled={isPending}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isPending ? "Cancelling..." : "Yes, cancel"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete this appointment? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AppointmentCard;