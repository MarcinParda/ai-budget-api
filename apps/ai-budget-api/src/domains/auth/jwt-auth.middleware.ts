import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import CustomError from '../../utils/errors/customError';

export function jwtAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    throw new CustomError('Authorization header is missing', 401);
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      next(err);
    }
    next();
  });
}
