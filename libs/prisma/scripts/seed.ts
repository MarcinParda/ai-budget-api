import { prisma } from '../src';
import { seedUsers } from './seeds/users.seed';

async function main() {
  await seedUsers(10);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
