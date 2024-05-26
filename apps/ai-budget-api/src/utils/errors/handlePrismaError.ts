import { Prisma } from "@prisma/client";
import CustomError from "./customError";

export const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError) => {
  switch (err.code) {
    case 'P2002':
      // handling duplicate key errors
      return new CustomError(`Duplicate field value: ${err.meta.target}`, 400);
    case 'P2014':
      // handling invalid id errors
      return new CustomError(`Invalid ID: ${err.meta.target}`, 400);
    case 'P2003':
      // handling invalid data errors
      return new CustomError(`Invalid input data: ${err.meta.target}`, 400);
    default:
      // handling all other errors
      return new CustomError(`Something went wrong: ${err.message}`, 500);
  }
};
