import { prisma } from '@ai-budget-api/prisma';
import express from 'express';
import { errorHandler } from '../../utils/errors/errorHandler';
import CustomError from '../../utils/errors/customError';

export const usersRouter = express.Router();

// GET /api/users
usersRouter.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

// GET /api/users/:id
usersRouter.get('/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    if (!user) {
      const error = new CustomError('User not found', 404);
      errorHandler(error, req, res);
    }
    res.json(user);
  } catch (err) {
    errorHandler(err, req, res);
  }
});
