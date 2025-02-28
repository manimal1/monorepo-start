// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// eslint-disable-next-line
async function main(): Promise<any> {
  await prisma.user.create({
    data: {
      firstName: 'Jack',
      lastName: 'Sparrow',
      email: 'captian-jack@black-pearl.com',
      born: 1978,
    },
  });
}

main()
  .catch((e) => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// prisma commands
// npx prisma migrate reset  --> be careful! this deletes all db data
// npx prisma migrate dev --name update_user_model  --> run migration for something like updating a model
