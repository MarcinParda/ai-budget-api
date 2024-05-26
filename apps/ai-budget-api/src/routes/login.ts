import express from 'express';
import passport from '../config/passport';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/errors/errorHandler';
import CustomError from '../utils/errors/customError';

export const loginRouter = express.Router();

loginRouter.post('/', (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: unknown, user: Express.User) => {
      if (err) {
        errorHandler(err, req, res);
      }

      if (!user) {
        const error = new CustomError('Invalid username or password', 400);
        errorHandler(error, req, res);
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          errorHandler(err, req, res);
        }

        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: '15m',
        });
        return res.json({ token });
      });
    }
  )(req, res, next);
});
