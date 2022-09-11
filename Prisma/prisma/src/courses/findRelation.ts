import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//adicionando mais params de outras tabelas para buscar dados do professor

async function main(id: string) {
  const result = await prisma.courses.findMany({
    include: {
      teacher: true,
    },
  });

  console.log(result);
}

main('aded9350-031d-4fca-8569-57ed7ea7b59e');
