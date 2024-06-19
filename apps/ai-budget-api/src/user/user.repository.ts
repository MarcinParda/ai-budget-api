import { prisma } from '@ai-budget-api/prisma';

export async function insert(
  username: string,
  email: string,
  hashedPassword: string
) {
  await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}