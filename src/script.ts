import { PrismaClient } from "@prisma/client";
prisma = new PrismaClient();

async function main() {}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    prisma?.$disconnect();
  });
