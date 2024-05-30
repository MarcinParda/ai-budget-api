import express from 'express';
import passport from '../config/passport';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/errors/errorHandler';
import CustomError from '../utils/errors/customError';
import { User } from '@prisma/client';
import { prisma } from '@ai-budget-api/prisma';

export const loginRouter = express.Router();

loginRouter.post('/', (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: unknown, user: User) => {
      if (err) {
        errorHandler(err, req, res);
      }

      if (!user) {
        const error = new CustomError('Invalid email or password', 400);
        errorHandler(error, req, res);
      }

      req.login(user, { session: false }, async (err) => {
        if (err) {
          errorHandler(err, req, res);
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

        await prisma.refreshToken.create({
          data: {
            userId: user.id,
            refreshToken,
            expiresAt: new Date(
              Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRES_IN_MS)
            ),
          },
        });

        return res.json({ accessToken, refreshToken });
      });
    }
  )(req, res, next);
});
