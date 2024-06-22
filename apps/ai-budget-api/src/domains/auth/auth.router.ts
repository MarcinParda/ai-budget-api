import express from 'express';
import * as authController from './auth.controller';
import { validateData } from '../shared/middlewares/validationMiddleware';
import { registerSchema } from './auth.schemas';

export const authRouter = express.Router();

authRouter.post('/register', validateData(registerSchema), authController.register);
authRouter.post('/refresh-token', authController.refreshToken);
authRouter.post('/login', authController.login);
