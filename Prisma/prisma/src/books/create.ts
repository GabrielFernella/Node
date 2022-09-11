import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.books.create({
    data: {
      name: 'Arquitetura Limpa',
      author_id: 'aded9350-031d-4fca-8569-57ed7ea7b59e',
    },
  });
  console.log(result);
}

main();
