// lib/actions/appointments.ts
"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { sendAppointmentConfirmation, sendAppointmentCancellation } from "../emails";
import { format } from "date-fns";

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

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      throw new Error("User profile not found. Please try signing in again.");
    }

    const doctor = await prisma.doctor.findUnique({
      where: { id: data.doctorId },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    if (!doctor.isActive) {
      throw new Error("This doctor is currently not available for appointments");
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        doctorId: data.doctorId,
        date: data.date,
        time: data.time,
        status: {
          in: ["SCHEDULED", "CONFIRMED"],
        },
      },
    });

    if (existingAppointment) {
      throw new Error("This time slot is already booked. Please choose another time.");
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: dbUser.id,
        doctorId: data.doctorId,
        date: data.date,
        time: data.time,
        duration: data.duration || 30,
        reason: data.reason,
        notes: data.notes,
        status: "SCHEDULED",
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

    console.log("✅ Appointment created:", appointment.id);

    // Send confirmation email
    const userEmail = user.emailAddresses[0]?.emailAddress;
    
    if (userEmail) {
      try {
        await sendAppointmentConfirmation({
          to: userEmail,
          userName: user.firstName || 'there',
          doctorName: doctor.name,
          doctorSpecialty: doctor.specialty,
          appointmentDate: format(new Date(data.date), 'EEEE, MMMM d, yyyy'),
          appointmentTime: data.time,
          appointmentDuration: data.duration || 30,
          reason: data.reason,
          notes: data.notes,
        });
        
        console.log('✅ Confirmation email sent');
      } catch (emailError: any) {
        console.error('⚠️ Email failed (non-critical):', emailError.message);
        // Don't fail appointment creation if email fails
      }
    }

    revalidatePath("/appointment");
    revalidatePath("/dashboard");

    return appointment;
  } catch (error: any) {
    console.error("❌ Error creating appointment:", error);
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
      throw new Error("You must be signed in to update appointments");
    }

    const appointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        user: {
          clerkId: user.id,
        },
      },
      include: {
        doctor: true,
      },
    });

    if (!appointment) {
      throw new Error("Appointment not found or you don't have permission to modify it");
    }

    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: status,
      },
      include: {
        doctor: {
          select: {
            name: true,
            specialty: true,
          },
        },
      },
    });

    console.log(`✅ Appointment ${appointmentId} updated to ${status}`);

    // Send cancellation email if cancelled
    if (status === "CANCELLED") {
      const userEmail = user.emailAddresses[0]?.emailAddress;
      
      if (userEmail) {
        try {
          await sendAppointmentCancellation({
            to: userEmail,
            userName: user.firstName || 'there',
            doctorName: appointment.doctor.name,
            appointmentDate: format(new Date(appointment.date), 'EEEE, MMMM d, yyyy'),
            appointmentTime: appointment.time,
          });
          
          console.log('✅ Cancellation email sent');
        } catch (emailError: any) {
          console.error('⚠️ Cancellation email failed (non-critical):', emailError.message);
        }
      }
    }

    revalidatePath("/appointment");
    revalidatePath("/dashboard");

    return updatedAppointment;
  } catch (error: any) {
    console.error("❌ Error updating appointment:", error);
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

    console.log(`✅ Appointment ${appointmentId} deleted`);

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