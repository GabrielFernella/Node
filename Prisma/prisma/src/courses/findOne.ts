import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const course = prisma.courses.findFirst({
    take: -1,
  });
  console.log(course);
}

main();
