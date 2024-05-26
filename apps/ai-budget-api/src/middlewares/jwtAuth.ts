import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { errorHandler } from '../utils/errors/errorHandler';

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    const err = new Error('Authorization token missing');
    errorHandler(err, req, res);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      errorHandler(err, req, res);
      // return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    next();
  });
};
