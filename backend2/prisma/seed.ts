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
        '[{"id":"82546bf7-b745-4134-a486-68deb2db42ed","name":"TableBlock","displayName":"TableBlock 1","props":{"columns":[{"title":"Name","dataIndex":"name","key":"name"},{"title":"Age","dataIndex":"age","key":"age"},{"title":"Address","dataIndex":"address","key":"address"}],"dataSource":[{"key":"1","name":"Mike","age":32,"address":"10 Downing Street"},{"key":"2","name":"John","age":42,"address":"10 Downing Street"},{"key":"3","name":"John","age":42,"address":"10 Downing Street"},{"key":"4","name":"John","age":42,"address":"10 Downing Street"},{"key":"5","name":"John","age":42,"address":"10 Downing Street"},{"key":"6","name":"John","age":42,"address":"10 Downing Street"},{"key":"7","name":"John","age":42,"address":"10 Downing Street"},{"key":"8","name":"John","age":42,"address":"10 Downing Street"},{"key":"9","name":"John","age":42,"address":"10 Downing Street"},{"key":"10","name":"John","age":42,"address":"10 Downing Street"}]},"position":{"x":30,"y":35,"width":459,"height":687}}]',
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
        '[{"id":"a3cf32ad-5d47-4b71-af79-6c5943bd41c8","name":"TableBlock","displayName":"TableBlock 1","props":{},"position":{"x":0,"y":20,"width":320,"height":669}}]',
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
        '[{"id":"a3cf32ad-5d47-4b71-af79-6c5943bd41c8","name":"TableBlock","displayName":"TableBlock 1","props":{},"position":{"x":0,"y":20,"width":320,"height":669}}]',
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
