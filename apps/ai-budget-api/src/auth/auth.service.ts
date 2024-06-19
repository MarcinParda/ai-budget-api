import CustomError from '../utils/errors/customError';
import jwt from 'jsonwebtoken';
import * as authRepository from './auth.repository';
import * as userRepository from '../user/user.repository';

function isValidDecodedToken(
  decoded: unknown
): decoded is { userId: string } {
  return typeof decoded === 'object' && decoded !== null && 'userId' in decoded;
};

export async function refreshToken(refreshToken: string) {
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (!isValidDecodedToken(decoded)) {
    throw new CustomError('Invalid refresh token', 401);
  }

  const storedRefreshToken = await authRepository.getRefreshToken(refreshToken);
  if (!storedRefreshToken || storedRefreshToken.expiresAt < new Date()) {
    throw new CustomError('Refresh token is invalid or expired', 401);
  }

  const user = await userRepository.getUserById(decoded.userId);

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
  );

  return accessToken;
}
