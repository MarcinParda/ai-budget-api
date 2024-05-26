import CustomError from './customError';

export const handleJWTError = () =>
  new CustomError('Invalid token. Please login again', 400);

export const handleJWTExpiredError = () =>
  new CustomError('Token has expired. Please login again', 400);
