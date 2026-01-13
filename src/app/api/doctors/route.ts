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

    return NextResponse.json(
      doctors.map(d => ({
        ...d,
        appointmentCount: d._count.appointments,
      }))
    );
  } catch (err) {
    console.error(err);
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
        gender: body.gender,
        isActive: true,
      },
    });

    return NextResponse.json(doctor, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Doctor with this email already exists" },
      { status: 500 }
    );
  }
}
