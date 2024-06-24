import express from 'express';
import * as authController from './auth.controller';
import { validateData } from '../shared/middlewares/validationMiddleware';
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from './auth.schemas';

export const authRouter = express.Router();

// POST /api/auth/register
authRouter.post(
  '/register',
  validateData(registerSchema),
  authController.register
);

// POST /api/auth/refresh-token
authRouter.post(
  '/refresh-token',
  validateData(refreshTokenSchema),
  authController.refreshToken
);

// POST /api/auth/login
authRouter.post('/login', validateData(loginSchema), authController.login);
