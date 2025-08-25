'use server';

import type { GameId } from '@prisma/client';
import { formUtils } from '@/components/form/utils';
import { authData } from '@/features/auth/data';
import { gameData } from '@/features/game/data';

export const getFavoriteGameIds = async (): Promise<GameId[]> => {
  const { user } = await authData.getAuth();
  if (!user) {
    return [];
  }

  try {
    return await gameData.getFavoriteGameIds();
  } catch (error) {
    formUtils.fromErrorToActionState({ error });
    return [];
  }
};
