import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
   const doctors = await prisma.doctor.findMany({
      include: {
        _count: { select: { appointments: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const data = doctors.map((doctor) => ({
      ...doctor,
      appointmentCount: doctor._count.appointments,
    }));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json([], { status: 200 });
  }
}



export async function POST(req: Request) {
  try {
    const body = await req.json();

    const doctor = await prisma.doctor.create({
      data: {
        name: body.name,
        email: body.email,
        phoneNumber: body.phoneNumber,
        specialty: body.specialty,
        gender: body.gender, // MALE | FEMALE
        isActive: true,
      },
    });

    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create doctor" },
      { status: 500 }
    );
  }
}
