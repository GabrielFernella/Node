import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(id: string) {
  const result = await prisma.modules.create({
    data: {
      name: 'Firebae',
      description: 'Aprendendo Firebase do zero',
      courses: {
        create: {
          course: {
            connect: {
              id,
            },
          },
        },
      },
    },
  });
  console.log(result);
}

main('');
