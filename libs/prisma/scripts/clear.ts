import { prisma } from '../src';

async function main() {
  await prisma.user.deleteMany({});
  console.log('Database cleared');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
