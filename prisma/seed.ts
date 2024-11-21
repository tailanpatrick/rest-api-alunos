import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Lista de 5 estudantes
  const students = [
    { name: 'João', surname: 'Silva', email: 'joao.silva@example.com', age: 20, weight: 70.5, height: 1.75 },
    { name: 'Maria', surname: 'Oliveira', email: 'maria.oliveira@example.com', age: 22, weight: 65.2, height: 1.68 },
    { name: 'Pedro', surname: 'Santos', email: 'pedro.santos@example.com', age: 19, weight: 80.3, height: 1.80 },
    { name: 'Ana', surname: 'Souza', email: 'ana.souza@example.com', age: 21, weight: 55.4, height: 1.60 },
    { name: 'Lucas', surname: 'Lima', email: 'lucas.lima@example.com', age: 23, weight: 72.8, height: 1.78 },
  ];

  // Insere os estudantes no banco de dados
  for (const student of students) {
    await prisma.student.create({
      data: student,
    });
  }

  console.log('Seed de students concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
