import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string({ message: 'Username must be a string' })
    .min(3, 'Username must be at least 3 characters')
    .max(255, 'Username must be at most 255 characters'),
  email: z
    .string({ message: 'Email must be a string' })
    .email('Invalid email format. Please provide a valid email address'),
  password: z
    .string({ message: 'Password must be a string' })
    .min(8, 'Password must be at least 8 characters')
    .max(255, 'Password must be at most 255 characters'),
});
