import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.componentData.deleteMany();
  await prisma.appComponent.deleteMany();
  await prisma.app.deleteMany();
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

  const app1 = await prisma.app.create({
    data: {
      name: 'App1',
      isPublic: true,
      slug: 'app1',
      data: { name: 'Ekas1' },
      user: {
        connect: {
          id: user1.id,
        },
      },
    },
  });

  const appComponent1 = await prisma.appComponent.create({
    data: {
      name: 'AppComponent1',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      app: {
        connect: {
          id: app1.id,
        },
      },
    },
  });

  const componentData1 = await prisma.componentData.create({
    data: {
      data: {},
      appComponent: {
        connect: {
          id: appComponent1.id,
        },
      },
    },
  });

  const comment1 = await prisma.comment.create({
    data: {
      text: 'Comment1 from User John on App 1',
      app: {
        connect: {
          id: app1.id,
        },
      },
      user: {
        connect: {
          id: user1.id,
        },
      },
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

  const app2 = await prisma.app.create({
    data: {
      name: 'App2',
      isPublic: true,
      slug: 'app2',
      data: { name: 'Ekas2' },
      user: {
        connect: {
          id: user2.id,
        },
      },
    },
  });

  const appComponent2 = await prisma.appComponent.create({
    data: {
      name: 'AppComponent2',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      app: {
        connect: {
          id: app2.id,
        },
      },
    },
  });

  const componentData2 = await prisma.componentData.create({
    data: {
      data: {},
      appComponent: {
        connect: {
          id: appComponent2.id,
        },
      },
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      text: 'Comment2 from User Bile on App 2',
      app: {
        connect: {
          id: app2.id,
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

  const app3 = await prisma.app.create({
    data: {
      name: 'App3',
      isPublic: true,
      slug: 'app3',
      data: { name: 'Ekas3' },
      user: {
        connect: {
          id: user3.id,
        },
      },
    },
  });

  const appComponent3 = await prisma.appComponent.create({
    data: {
      name: 'AppComponent3',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      app: {
        connect: {
          id: app3.id,
        },
      },
    },
  });

  const componentData3 = await prisma.componentData.create({
    data: {
      data: {},
      appComponent: {
        connect: {
          id: appComponent3.id,
        },
      },
    },
  });

  const comment3 = await prisma.comment.create({
    data: {
      text: 'Comment3 from User Ekas Preet on App 3',
      app: {
        connect: {
          id: app3.id,
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
