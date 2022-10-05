import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.page.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding...');

  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '$2a$10$U5q0hL4C7gAiHoVKESXwQeGFT7LHj56JIzDJrlTp2JKLeJEv27z.S', // secretJohn32
      role: 'ADMIN',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bile.simpson@gmail.com',
      firstName: 'Bile',
      lastName: 'Simpson',
      role: 'DEVELOPER',
      password: '$2a$10$W3linkpv.XJciVgLFc7RfObOtZ23f/63KNTy/5hEMB7BHrOmoOgm2', // secretBile32
    },
  });

  const page1 = await prisma.page.create({
    data: {
      name: 'Page 1',
      isPublic: true,
      slug: 'page1',
      definition:
        '{"component":{"name":"Page1 Component1","x":0,"y":0,"width":100,"height":100,"data":{}}}',
      user: {
        connect: {
          id: user2.id,
        },
      },
    },
  });

  const comment1 = await prisma.comment.create({
    data: {
      text: 'Comment1 from User Bile on Page 1',
      page: {
        connect: {
          id: page1.id,
        },
      },
      user: {
        connect: {
          id: user2.id,
        },
      },
    },
  });

  const page2 = await prisma.page.create({
    data: {
      name: 'Page 2',
      isPublic: true,
      slug: 'page2',
      definition:
        '{"component":{"name":"Page2 Component1","x":0,"y":0,"width":100,"height":100,"data":{}}}',
      user: {
        connect: {
          id: user2.id,
        },
      },
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      text: 'Comment2 from User Bile on Page 2',
      page: {
        connect: {
          id: page2.id,
        },
      },
      user: {
        connect: {
          id: user2.id,
        },
      },
    },
  });

  const page3 = await prisma.page.create({
    data: {
      name: 'Page 3',
      isPublic: false,
      slug: 'page3',
      definition:
        '{"component":{"name":"Page3 Component1","x":0,"y":0,"width":100,"height":100,"data":{}}}',
      user: {
        connect: {
          id: user2.id,
        },
      },
    },
  });

  const comment3 = await prisma.comment.create({
    data: {
      text: 'Comment3 from User Bile on Page 3',
      page: {
        connect: {
          id: page3.id,
        },
      },
      user: {
        connect: {
          id: user2.id,
        },
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'ekaspreet93.singh@gmail.com',
      firstName: 'Ekas Preet',
      lastName: 'Singh',
      password: '$2a$10$AX1KUby95KVvgWsgFXrj7e33Pct4yjqrzNwNTO2Yh8eXbrWR6eutO', // secretEkas32
      role: 'OPERATOR',
    },
  });

  const comment4 = await prisma.comment.create({
    data: {
      text: 'Comment4 from User John on Page 1',
      page: {
        connect: {
          id: page1.id,
        },
      },
      user: {
        connect: {
          id: user1.id,
        },
      },
    },
  });

  const comment5 = await prisma.comment.create({
    data: {
      text: 'Comment5 from User Ekas on Page 2',
      page: {
        connect: {
          id: page2.id,
        },
      },
      user: {
        connect: {
          id: user3.id,
        },
      },
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
