import { Request, Response } from 'express-serve-static-core';
import { UnknownError } from './types';
import {
  isJWTError,
  isJWTExpiredError,
  isPrismaError,
} from './errorPredicates';
import { handlePrismaError } from './handlePrismaError';
import { handleJWTError, handleJWTExpiredError } from './handleAuthError';
import { ZodError } from 'zod';
import CustomError from './customError';

const sendErrorDev = (err: UnknownError, req: Request, res: Response) => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      errors: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    //rendered website
    res
      .status(err.statusCode)
      .render('error', { title: 'Something went wrong!', msg: err.message });
  }
};

const sendErrorProd = (err: UnknownError, req: Request, res: Response) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res
        .status(err.statusCode)
        .json({ status: err.status, message: err.message });
    }

    //programming errors dont leak details
    console.error('ERROR 💥', err);

    return res
      .status(400)
      .json({ status: 'error', message: 'Please try again later' });
  }

  //for rendered website
  if (err.isOperational)
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  //programming errors should not leak details to client

  return res
    .status(500)
    .json({ status: ' error', message: 'Something went wrong' });
};

export const handleError = (err: unknown, req: Request, res: Response) => {
  const unknownError = err as UnknownError;
  unknownError.statusCode = unknownError.statusCode || 500;
  unknownError.status = unknownError.status || 'error';

  let error = { ...unknownError };
  error.message = unknownError.message;

  if (err instanceof ZodError) {
    const errorMessage = err.errors.map((issue) => issue.message).join('\n');
    error = new CustomError(errorMessage, 400);
  }
  if (isPrismaError(unknownError)) {
    error = handlePrismaError(unknownError);
  }
  if (isJWTError(unknownError)) {
    error = handleJWTError();
  }
  if (isJWTExpiredError(unknownError)) {
    error = handleJWTExpiredError();
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, req, res);
  }
  if (process.env.NODE_ENV === 'production') {
    sendErrorProd(error, req, res);
  }
};
