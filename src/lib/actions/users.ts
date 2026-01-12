"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "../prisma";

export async function syncUser() {
  try {
    const user = await currentUser();

    if (!user) return null;

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!existingUser) {
      const dbUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress || "", // consider making email nullable
          firstName: user.firstName || null,
          lastName: user.lastName || null,
          phoneNumber: user.phoneNumbers[0]?.phoneNumber || null,
        },
      });

      return dbUser;
    }

    // user already exists → nothing to do
    return existingUser;
  } catch (error) {
    console.error("Error syncing user:", error);
    throw error; // rethrow so calling code can handle it
  }
}
