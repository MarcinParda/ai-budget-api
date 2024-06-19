import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { errorHandler } from '../utils/errors/errorHandler';
import CustomError from '../utils/errors/customError';

export function jwtAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    const error = new CustomError('Authorization header is missing', 401);
    errorHandler(error, req, res);
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      errorHandler(err, req, res);
    }
    next();
  });
}
