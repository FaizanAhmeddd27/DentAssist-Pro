// lib/actions/appointments.ts
"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";


export async function getUserStats() {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        totalAppointments: 0,
        completedAppointments: 0,
        pendingAppointments: 0,
        cancelledAppointments: 0,
      };
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        user: {
          clerkId: user.id,
        },
      },
      select: {
        status: true,
      },
    });

    const stats = {
      totalAppointments: appointments.length,
      completedAppointments: appointments.filter(
        (apt) => apt.status === "COMPLETED"
      ).length,
      pendingAppointments: appointments.filter(
        (apt) => apt.status === "SCHEDULED" || apt.status === "CONFIRMED"
      ).length,
      cancelledAppointments: appointments.filter(
        (apt) => apt.status === "CANCELLED" || apt.status === "NO_SHOW"
      ).length,
    };

    return stats;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return {
      totalAppointments: 0,
      completedAppointments: 0,
      pendingAppointments: 0,
      cancelledAppointments: 0,
    };
  }
}

export async function getUserAppointments() {
  try {
    const user = await currentUser();

    if (!user) {
      return [];
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        user: {
          clerkId: user.id,
        },
      },
      orderBy: { createdAt: "desc" },
      include: {
        doctor: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            specialty: true,
          },
        },
      },
    });

    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}

export async function getNextAppointment() {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const now = new Date();

    const nextAppointment = await prisma.appointment.findFirst({
      where: {
        user: {
          clerkId: user.id,
        },
        status: {
          in: ["CONFIRMED", "SCHEDULED"],
        },
        date: {
          gte: now,
        },
      },
      orderBy: {
        date: "asc",
      },
      include: {
        doctor: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            specialty: true,
          },
        },
      },
    });

    return nextAppointment;
  } catch (error) {
    console.error("Error fetching next appointment:", error);
    return null;
  }
}

export async function createAppointment(data: {
  doctorId: string;
  date: Date;
  time: string;
  duration?: number;
  reason?: string;
  notes?: string;
}) {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("You must be signed in to book an appointment");
    }

    // Get DB user
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      throw new Error("User profile not found");
    }

    // Check doctor
    const doctor = await prisma.doctor.findUnique({
      where: { id: data.doctorId },
    });

    if (!doctor || !doctor.isActive) {
      throw new Error("Doctor is not available");
    }

    // Check time conflict
    const conflict = await prisma.appointment.findFirst({
      where: {
        doctorId: data.doctorId,
        date: data.date,
        time: data.time,
        status: {
          in: ["SCHEDULED", "CONFIRMED"],
        },
      },
    });

    if (conflict) {
      throw new Error("This time slot is already booked");
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        userId: dbUser.id,
        doctorId: data.doctorId,
        date: data.date,
        time: data.time,
        duration: data.duration ?? 30,
        reason: data.reason,
        notes: data.notes,
        status: "SCHEDULED",
      },
      include: {
        doctor: {
          select: {
            id: true,
            name: true,
            specialty: true,
            imageUrl: true,
          },
        },
      },
    });

    revalidatePath("/appointment");
    revalidatePath("/dashboard");

    return appointment;
  } catch (error: any) {
    console.error("❌ Create appointment error:", error);
    throw new Error(error.message || "Failed to create appointment");
  }
}

export async function updateAppointmentStatus(
  appointmentId: string,
  status: "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW"
) {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("You must be signed in");
    }

    // Check ownership
    const appointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        user: {
          clerkId: user.id,
        },
      },
    });

    if (!appointment) {
      throw new Error("Appointment not found or unauthorized");
    }

    // Update status
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
      include: {
        doctor: {
          select: {
            name: true,
            specialty: true,
          },
        },
      },
    });

    revalidatePath("/appointment");
    revalidatePath("/dashboard");

    return updatedAppointment;
  } catch (error: any) {
    console.error("❌ Update appointment error:", error);
    throw new Error(error.message || "Failed to update appointment");
  }
}


export async function deleteAppointment(appointmentId: string) {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("You must be signed in to delete appointments");
    }

    const appointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        user: {
          clerkId: user.id,
        },
      },
    });

    if (!appointment) {
      throw new Error("Appointment not found or you don't have permission to delete it");
    }

    await prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    });

    // Revalidate pages
    revalidatePath("/appointment");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error: any) {
    console.error("❌ Error deleting appointment:", error);
    throw new Error(error.message || "Failed to delete appointment");
  }
}

export async function getAllDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        specialty: true,
        imageUrl: true,
        gender: true,
        bio: true,
      },
    });

    return doctors;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

export async function getDoctorById(doctorId: string) {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: {
        id: doctorId,
        isActive: true,
      },
      include: {
        appointments: {
          where: {
            status: {
              in: ["SCHEDULED", "CONFIRMED"],
            },
          },
          select: {
            date: true,
            time: true,
          },
        },
      },
    });

    return doctor;
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return null;
  }
}