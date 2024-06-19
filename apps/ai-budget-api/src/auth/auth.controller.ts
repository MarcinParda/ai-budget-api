import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils/errors/errorHandler';
import * as userService from '../user/user.service';
import * as authService from './auth.service';
import CustomError from '../utils/errors/customError';

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      const error = new CustomError(
        'Username, email, and password are required',
        400
      );
      errorHandler(error, req, res);
    }

    await userService.register(username, email, password);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err: unknown) {
    errorHandler(err, req, res);
  }
}

export async function refreshToken(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      const error = new CustomError('Refresh token is required', 401);
      errorHandler(error, req, res);
    }

    const accessToken = await authService.refreshToken(refreshToken);

    return res.json({ accessToken });
  } catch (err) {
    errorHandler(err, req, res);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.login(req, res, next);
  } catch (err) {
    errorHandler(err, req, res);
  }
}

