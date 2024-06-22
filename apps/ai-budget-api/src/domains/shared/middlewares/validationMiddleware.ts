import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { errorHandler } from '../../../utils/errors/errorHandler';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      errorHandler(error, req, res);
    }
  };
}
