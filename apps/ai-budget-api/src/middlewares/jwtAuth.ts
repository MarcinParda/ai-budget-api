import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express-serve-static-core';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const jwtAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded;
    next();
  });
};
