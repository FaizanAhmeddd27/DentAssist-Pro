import { PrismaClient, Gender } from "@prisma/client";
import { doctors } from "./doctors";

const prisma = new PrismaClient();

async function main() {
  await prisma.doctor.createMany({
    data: doctors,
    skipDuplicates: true,
  });

  console.log("✅ Doctors seeded successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
