import bcrypt from 'bcrypt';
import * as userRepository from './user.repository';

export async function register(
  username: string,
  email: string,
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await userRepository.insert(username, email, hashedPassword);
}
