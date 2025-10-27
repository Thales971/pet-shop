// Alteração aqui: usando 'import' em vez de 'require'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o processo de seed...');

  // 1. Limpar dados existentes
  console.log('Limpando a tabela PetShops...');
  await prisma.petShop.deleteMany({});
  console.log('Tabela limpa.');

  // 2. Definir dados de amostra
  const petNames = [
    'Max', 'Bella', 'Charlie', 'Lucy', 'Cooper', 'Luna', 'Buddy',
    'Daisy', 'Rocky', 'Lola', 'Milo', 'Zoe', 'Toby', 'Nala', 'Jack', 'Ruby'
  ];
  const especies = [
    'Cachorro', 'Gato', 'Pássaro', 'Hamster', 'Peixe', 'Coelho', 'Tartaruga', 'Furão'
  ];
  const donos = [
    'Ana Silva', 'Bruno Costa', 'Carla Dias', 'Daniel Moreira', 'Elisa Fernandes',
    'Fábio Guedes', 'Gabriela Lima', 'Hugo Martins', 'Isabela Nunes', 'João Pereira',
    'Marcos Rocha', 'Lia Borges', 'Pedro Alves', 'Sofia Ribeiro'
  ];

  // 3. Gerar 50 registros
  const petData = [];
  const totalInserts = 50;

  console.log(`Gerando ${totalInserts} registros...`);

  for (let i = 0; i < totalInserts; i++) {
    petData.push({
      nome: petNames[Math.floor(Math.random() * petNames.length)],
      especie: especies[Math.floor(Math.random() * especies.length)],
      raca: 'Raça Exemplo', // Adicionando raça como exemplo, pode ser randomizado se necessário
      idade: Math.floor(Math.random() * 15) + 1, // Idade aleatória de 1 a 15
      dono: donos[Math.floor(Math.random() * donos.length)],
    });
  }

  // 4. Inserir os dados no banco
  console.log(`Inserindo ${totalInserts} registros na tabela PetShops...`);
  await prisma.petShop.createMany({
    data: petData,
  });

  console.log('Seed concluído com sucesso! ✅');
}

// 5. Executar a função main e tratar erros
main()
  .catch((e) => {
    console.error('Erro durante o processo de seed: ', e);
    process.exit(1);
  })
  .finally(async () => {
    // 6. Desconectar do Prisma Client
    await prisma.$disconnect();
    console.log('Desconectado do banco de dados.');
  });