// hooks/use-appointments.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
interface AppointmentData {
  doctorId: string;
  date: Date;
  time: string;
  duration: number;
  reason?: string;
  notes?: string;
}

interface UpdateStatusData {
  id: string;
  status: string;
}

// Get all appointments for current user
export function useGetAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await fetch("/api/appointments", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch appointments");
      return res.json();
    },
    initialData: [],
  });
}

// Get all doctors
export function useGetDoctors() {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch("/api/doctors", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch doctors");
      return res.json();
    },
    initialData: [],
  });
}

// Create appointment mutation
export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AppointmentData) => {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create appointment");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Appointment booked successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to book appointment");
    },
  });
}

// Update appointment status mutation
export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: UpdateStatusData) => {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update appointment");
      }

      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      const statusMessages: Record<string, string> = {
        CONFIRMED: "Appointment confirmed successfully!",
        CANCELLED: "Appointment cancelled successfully",
        COMPLETED: "Appointment marked as completed",
      };
      toast.success(statusMessages[variables.status] || "Appointment updated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update appointment");
    },
  });
}

// Delete appointment mutation
export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete appointment");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Appointment deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete appointment");
    },
  });
}