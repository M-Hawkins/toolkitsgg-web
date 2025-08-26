'use server';

import type { GameId } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import type { ActionState } from '@/components/form/types';
import { fromErrorToActionState, toActionState } from '@/components/form/utils';
import { authQueries } from '@/features/auth/queries';
import { gameMutations } from '@/features/game/mutations';
import { gameUtils } from '@/features/game/utils';

export const toggleFavoriteGame = async (
  gameId: GameId
): Promise<ActionState> => {
  const { user } = await authQueries.getAuthOrRedirect();
  if (!user) {
    throw new Error('User not authenticated');
  }

  if (!gameUtils.isGameId(gameId)) {
    throw new Error(`Invalid GameId: ${gameId}`);
  }

  try {
    const { existingFavorite } = await gameMutations.toggleFavoriteGame(gameId);

    revalidatePath(`/${gameId}`);
    return toActionState({
      status: 'SUCCESS',
      message: existingFavorite
        ? 'Game removed from favorites'
        : 'Game added to favorites',
    });
  } catch (error) {
    return fromErrorToActionState({ error });
  }
};
