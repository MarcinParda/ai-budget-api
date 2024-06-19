import { prisma } from '@ai-budget-api/prisma';

export function getRefreshToken(refreshToken: string) {
  return prisma.refreshToken.findUnique({
    where: { refreshToken },
  });
}
