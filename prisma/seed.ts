import { PrismaClient } from "generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.song.createMany({
    data: [
      { title: "Valerie", artist: "Amy Winehouse" },
      { title: "Psycho Killer", artist: "Talking Heads" },
      { title: "Lonely Boy", artist: "The Black Keys" },
      { title: "Tieduprightnow", artist: "Parcels" },
      { title: "Boys Don't Cry", artist: "The Cure" },
    ],
    skipDuplicates: true,
  });

  console.log("Seeded song amount: ", user.count);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
