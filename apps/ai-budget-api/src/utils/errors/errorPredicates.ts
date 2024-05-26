import { Prisma } from '@prisma/client';
import { UnknownError } from './types';

export const isPrismaError = (
  err: unknown
): err is Prisma.PrismaClientKnownRequestError => {
  return (err as Prisma.PrismaClientKnownRequestError)?.code !== undefined;
};

export const isJWTError = (err: unknown): err is UnknownError => {
  return (err as UnknownError)?.name === 'JsonWebTokenError';
};

export const isJWTExpiredError = (err: unknown): err is UnknownError => {
  return (err as UnknownError)?.name === 'TokenExpiredError';
};
