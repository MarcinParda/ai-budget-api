import express from 'express';
import * as userController from './user.controller';

export const usersRouter = express.Router();

// GET /api/users
usersRouter.get('/', userController.getUsers);

// GET /api/users/:id
usersRouter.get('/:id', userController.getUserById);
