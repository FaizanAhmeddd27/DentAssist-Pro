// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample doctors
  await prisma.doctor.createMany({
    data: [
      {
        name: "Sarah Johnson",
        email: "sarah.johnson@dental.com",
        specialty: "General Dentistry",
        gender: "FEMALE",
        bio: "Experienced general dentist with 10+ years of practice",
        isActive: true,
      },
      {
        name: "Michael Chen",
        email: "michael.chen@dental.com",
        specialty: "Orthodontics",
        gender: "MALE",
        bio: "Specialist in braces and teeth alignment",
        isActive: true,
      },
      {
        name: "Emily Rodriguez",
        email: "emily.rodriguez@dental.com",
        specialty: "Cosmetic Dentistry",
        gender: "FEMALE",
        bio: "Expert in smile makeovers and whitening",
        isActive: true,
      },
    ],
  });

  console.log("✅ Seed data created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });