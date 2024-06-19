import { prisma } from '@ai-budget-api/prisma';

export function getRefreshToken(refreshToken: string) {
  return prisma.refreshToken.findUnique({
    where: { refreshToken },
  });
}

export function insertRefreshToken(
  userId: string,
  refreshToken: string,
  expiresAt: Date
) {
  return prisma.refreshToken.create({
    data: {
      userId,
      refreshToken,
      expiresAt,
    },
  });
}
