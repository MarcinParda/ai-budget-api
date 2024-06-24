import { prisma } from '@ai-budget-api/prisma';
import { UserSchema, UsersArraySchema } from './user.schemas';

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

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return UsersArraySchema.parse(users).map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
  }));
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) return null;
  return UserSchema.parse({
    id: user.id,
    username: user.username,
    email: user.email,
  });
}
