import express from 'express';
import * as authController from './auth.controller';

export const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/refresh-token', authController.refreshToken);
authRouter.post('/login', authController.login);
