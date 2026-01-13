import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = {
  id: string;
};

/* ================= DELETE (Soft Delete) ================= */
export async function DELETE(
  req: Request,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params; // ✅ FIX

    const doctor = await prisma.doctor.update({
      where: { id },
      data: { isActive: false }, // soft delete
    });

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("DELETE Doctor Error:", error);
    return NextResponse.json(
      { error: "Failed to delete doctor" },
      { status: 500 }
    );
  }
}

/* ================= UPDATE ================= */
export async function PUT(
  req: Request,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params; // ✅ FIX
    const body = await req.json();

    const doctor = await prisma.doctor.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("UPDATE Doctor Error:", error);
    return NextResponse.json(
      { error: "Failed to update doctor" },
      { status: 500 }
    );
  }
}
