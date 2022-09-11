import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(id: string) {
  const result = await prisma.courses.update({
    where: {
      id,
    },
    data: {
      duration: 300,
    },
  });

  console.log(result);
}

main('aded9350-031d-4fca-8569-57ed7ea7b59e');
