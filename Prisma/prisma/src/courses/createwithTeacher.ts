import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.create({
    data: {
      duration: 200,
      name: 'Curso de nodejs',
      description: 'Curso para desenvolvedores backend',
      teacher: {
        connectOrCreate: {
          where: {
            name: 'Gabriel Santos',
          },
          create: {
            name: 'Gabriel Santos',
          },
        },
      },
    },
  });
  console.log(result);
}

main();
