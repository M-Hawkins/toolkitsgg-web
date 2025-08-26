import 'server-only';
import type { GameId } from '@prisma/client';
import { authQueries } from '@/features/auth/queries';
import prisma from '@/lib/prisma';

export const getFavoriteGameIds = async (): Promise<GameId[]> => {
  const { user } = await authQueries.getAuth();
  if (!user) {
    return [];
  }

  const favoriteGames = await prisma.userFavoriteGame.findMany({
    where: {
      userId: user.id,
    },
    select: {
      gameId: true,
    },
  });

  return favoriteGames.map((favoriteGame) => favoriteGame.gameId);
};
