// app/api/appointments/stats/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get all appointments for user
    const appointments = await prisma.appointment.findMany({
      where: {
        user: {
          clerkId: userId,
        },
      },
      select: {
        status: true,
        createdAt: true,
      },
    });

    // Calculate stats
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

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      {
        totalAppointments: 0,
        completedAppointments: 0,
        pendingAppointments: 0,
        cancelledAppointments: 0,
      },
      { status: 200 }
    );
  }
}