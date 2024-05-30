import { prisma } from '../../src';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

export async function seedUsers(numUsers: number) {
  const testPassword = await bcrypt.hash('test', 10);
  const users = Array.from({ length: numUsers - 1 }, () => ({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: testPassword,
  }));
  const testUser = {
    username: 'test',
    email: 'test@test.test',
    password: testPassword,
  };
  users.push(testUser);

  await prisma.user.createMany({ data: users });
}
