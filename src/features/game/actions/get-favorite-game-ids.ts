'use server';

import type { GameId } from '@prisma/client';
import { fromErrorToActionState } from '@/components/form/utils';
import { authQueries } from '@/features/auth/queries';
import { gameQueries } from '@/features/game/queries';

export const getFavoriteGameIds = async (): Promise<GameId[]> => {
  const { user } = await authQueries.getAuth();
  if (!user) {
    return [];
  }

  try {
    return await gameQueries.getFavoriteGameIds();
  } catch (error) {
    fromErrorToActionState({ error });
    return [];
  }
};
