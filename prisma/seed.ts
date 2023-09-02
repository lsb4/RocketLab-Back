// Criei esse código para povoar meu banco de dados de forma mais automática, vi em um artigo que era uma boa prática

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.product.upsert({
    where: { name: 'Gol' },
    update: {},
    create: {
      name: 'Gol',
      price: 32000.0,
      image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmotortudo.com%2Fgol-bola-96-o-ultimo-ano-da-injecao-monoponto-nas-veroes-intermediarias%2F&psig=AOvVaw0V7a8GFtk9RREk2YnmKtbf&ust=1693769581354000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPDGiMbVjIEDFQAAAAAdAAAAABAO',
      qntd: 10,
    },
  });

  const post2 = await prisma.product.upsert({
    where: { name: 'Palio' },
    update: {},
    create: {
      name: 'Palio',
      price: 38000.0,
      image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmotortudo.com%2Fgol-bola-96-o-ultimo-ano-da-injecao-monoponto-nas-veroes-intermediarias%2F&psig=AOvVaw0V7a8GFtk9RREk2YnmKtbf&ust=1693769581354000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPDGiMbVjIEDFQAAAAAdAAAAABAO',
      qntd: 15,
    },
  });

  const post3 = await prisma.product.upsert({
    where: { name: 'Commander' },
    update: {},
    create: {
      name: 'Commander',
      price: 183000.0,
      image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmotortudo.com%2Fgol-bola-96-o-ultimo-ano-da-injecao-monoponto-nas-veroes-intermediarias%2F&psig=AOvVaw0V7a8GFtk9RREk2YnmKtbf&ust=1693769581354000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPDGiMbVjIEDFQAAAAAdAAAAABAO',
      qntd: 5,
    },
  });

  const post4 = await prisma.product.upsert({
    where: { name: 'Corolla' },
    update: {},
    create: {
      name: 'Corolla',
      price: 121000.0,
      image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmotortudo.com%2Fgol-bola-96-o-ultimo-ano-da-injecao-monoponto-nas-veroes-intermediarias%2F&psig=AOvVaw0V7a8GFtk9RREk2YnmKtbf&ust=1693769581354000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPDGiMbVjIEDFQAAAAAdAAAAABAO',
      qntd: 7,
    },
  });

  const post5 = await prisma.product.upsert({
    where: { name: 'Tucson' },
    update: {},
    create: {
      name: 'Tucson',
      price: 83000.0,
      image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmotortudo.com%2Fgol-bola-96-o-ultimo-ano-da-injecao-monoponto-nas-veroes-intermediarias%2F&psig=AOvVaw0V7a8GFtk9RREk2YnmKtbf&ust=1693769581354000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPDGiMbVjIEDFQAAAAAdAAAAABAO',
      qntd: 7,
    },
  });

  console.log({ post1, post2, post3, post4, post5 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
