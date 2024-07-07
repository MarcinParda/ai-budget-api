import jwt from 'jsonwebtoken';
import * as authRepository from './auth.repository';
import * as userRepository from '../user/user.repository';
import passport from './passport';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import CustomError from '../../utils/errors/customError';

function isValidDecodedToken(decoded: unknown): decoded is { userId: string } {
  return typeof decoded === 'object' && decoded !== null && 'userId' in decoded;
}

export async function refreshToken(refreshToken: string) {
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (!isValidDecodedToken(decoded)) {
    throw new CustomError('Invalid refresh token', 401);
  }

  const storedRefreshToken = await authRepository.getRefreshToken(refreshToken);
  if (!storedRefreshToken || storedRefreshToken.expiresAt < new Date()) {
    throw new CustomError('Refresh token is invalid or expired', 401);
  }

  const user = await userRepository.getUserById(decoded.userId);

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
  );

  return accessToken;
}

export async function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'local',
    { session: false },
    (err: unknown, user: User) => {
      if (err) {
        next(err);
      }

      if (!user) {
        const error = new CustomError('Invalid email or password', 400);
        next(error);
      }

      req.login(user, { session: false }, async (err) => {
        if (err) {
          next(err);
        }

        const accessToken = jwt.sign(
          { userId: user.id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
          }
        );
        const refreshToken = jwt.sign(
          { userId: user.id },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
          }
        );

        const refreshTokenExpiresAt = new Date(
          Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRES_IN_MS)
        );
        await authRepository.insertRefreshToken(
          user.id,
          refreshToken,
          refreshTokenExpiresAt
        );

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          expires: refreshTokenExpiresAt,
        });

        return res.json({ token: accessToken });
      });
    }
  )(req, res, next);
}
