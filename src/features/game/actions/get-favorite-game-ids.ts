'use server';

import type { GameId } from '@prisma/client';
import { formUtils } from '@/components/form/utils';
import { getAuth } from '@/features/auth/queries/get-auth';
import { getFavoriteGameIds as getFavoriteGameIdsQuery } from '@/features/game/queries/get-favorite-game-ids';

export const getFavoriteGameIds = async (): Promise<GameId[]> => {
  const { user } = await getAuth();
  if (!user) {
    return [];
  }

  try {
    return await getFavoriteGameIdsQuery();
  } catch (error) {
    formUtils.fromErrorToActionState({ error });
    return [];
  }
};
