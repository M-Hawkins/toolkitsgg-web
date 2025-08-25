import 'server-only';
import type { GameId } from '@prisma/client';
import { authData } from '@/features/auth/data';
import prisma from '@/lib/prisma';

export const getFavoriteGameIds = async (): Promise<GameId[]> => {
  const { user } = await authData.getAuth();
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
