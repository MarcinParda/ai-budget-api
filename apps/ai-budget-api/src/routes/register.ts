import { prisma } from '@ai-budget-api/prisma';
import express from 'express';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/errors/errorHandler';

export const registerRouter = express.Router();

registerRouter.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err: unknown) {
    errorHandler(err, req, res);
  }
});
