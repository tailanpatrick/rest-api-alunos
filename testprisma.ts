import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    // Tenta criar um registro na tabela 'Test'
    const testRecord = await prisma.test.create({
      data: {
        name: 'Conexão bem-sucedida',
      },
    });

    console.log('Registro criado:', testRecord);

    // Busca todos os registros na tabela 'Test'
    const allRecords = await prisma.test.findMany();
    console.log('Todos os registros:', allRecords);
  } catch (error) {
    console.error('Erro ao se conectar ao banco de dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
