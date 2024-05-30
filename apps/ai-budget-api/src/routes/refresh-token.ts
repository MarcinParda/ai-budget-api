import { prisma } from '@ai-budget-api/prisma';
import express from 'express';
import { errorHandler } from '../utils/errors/errorHandler';
import CustomError from '../utils/errors/customError';
import jwt from 'jsonwebtoken';

export const refreshTokenRouter = express.Router();

const isValidDecodedToken = (
  decoded: unknown
): decoded is { userId: string } => {
  return typeof decoded === 'object' && decoded !== null && 'userId' in decoded;
};

refreshTokenRouter.post('/', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new CustomError('Refresh token is required', 401);
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!isValidDecodedToken(decoded)) {
      throw new CustomError('Invalid refresh token', 401);
    }

    const storedRefreshToken = await prisma.refreshToken.findUnique({
      where: { refreshToken },
    });
    if (!storedRefreshToken || storedRefreshToken.expiresAt < new Date()) {
      throw new CustomError('Refresh token is invalid or expired', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );

    return res.json({ accessToken });
  } catch (err) {
    errorHandler(err, req, res);
  }
});
