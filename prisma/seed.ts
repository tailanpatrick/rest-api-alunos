import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Encriptar a senha 123123
  const password_hash = await bcrypt.hash('123123', 8);

  // Lista de 20 usuários
  const users = [
    { name: 'João Silva', email: 'joao.silva@example.com', password_hash },
    { name: 'Maria Oliveira', email: 'maria.oliveira@example.com', password_hash },
    { name: 'Carlos Pereira', email: 'carlos.pereira@example.com', password_hash },
    { name: 'Ana Souza', email: 'ana.souza@example.com', password_hash },
    { name: 'Lucas Lima', email: 'lucas.lima@example.com', password_hash },
    { name: 'Fernanda Costa', email: 'fernanda.costa@example.com', password_hash },
    { name: 'Rafael Mendes', email: 'rafael.mendes@example.com', password_hash },
    { name: 'Clara Batista', email: 'clara.batista@example.com', password_hash },
    { name: 'Rodrigo Azevedo', email: 'rodrigo.azevedo@example.com', password_hash },
    { name: 'Juliana Almeida', email: 'juliana.almeida@example.com', password_hash },
    { name: 'André Silva', email: 'andre.silva@example.com', password_hash },
    { name: 'Mariana Santos', email: 'mariana.santos@example.com', password_hash },
    { name: 'Paulo Correia', email: 'paulo.correia@example.com', password_hash },
    { name: 'Carla Ramos', email: 'carla.ramos@example.com', password_hash },
    { name: 'Thiago Borges', email: 'thiago.borges@example.com', password_hash },
    { name: 'Bianca Teixeira', email: 'bianca.teixeira@example.com', password_hash },
    { name: 'Gabriel Rocha', email: 'gabriel.rocha@example.com', password_hash },
    { name: 'Larissa Nogueira', email: 'larissa.nogueira@example.com', password_hash },
    { name: 'Eduardo Vieira', email: 'eduardo.vieira@example.com', password_hash },
    { name: 'Camila Oliveira', email: 'camila.oliveira@example.com', password_hash },
  ];

  // Inserir os usuários no banco de dados
  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  console.log('20 usuários foram inseridos com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
