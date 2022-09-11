import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.authors.create({
    data: {
      name: 'Dan Brow',
      books: {
        create: {
          name: 'origem',
        },
      },
    },
  });
  console.log(result);
}

main();
