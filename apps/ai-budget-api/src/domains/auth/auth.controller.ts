import { NextFunction, Request, Response } from 'express';
import * as userService from '../user/user.service';
import * as authService from './auth.service';

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, email, password } = req.body;
    await userService.register(username, email, password);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err: unknown) {
    next(err);
  }
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { refreshToken } = req.body;
    const accessToken = await authService.refreshToken(refreshToken);

    return res.json({ accessToken });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.login(req, res, next);
  } catch (err) {
    next(err);
  }
}
