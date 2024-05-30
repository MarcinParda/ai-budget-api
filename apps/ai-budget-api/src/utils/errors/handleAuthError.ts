import CustomError from './customError';

export const handleJWTError = () =>
  new CustomError('Invalid access token. Please login again', 400);

export const handleJWTExpiredError = () =>
  new CustomError('Access token has expired. Please login again', 400);
