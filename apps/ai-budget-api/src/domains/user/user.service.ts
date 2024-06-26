import bcrypt from 'bcrypt';
import * as userRepository from './user.repository';
import CustomError from '../../utils/errors/customError';

export async function register(
  username: string,
  email: string,
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await userRepository.insert(username, email, hashedPassword);
}

export async function getAllUsers() {
  return await userRepository.getAllUsers();
}

export async function getUserById(id: string) {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new CustomError('User not found', 404);
  }
  return user;
}
