'use server';

import { fromErrorToActionState } from '@/components/form/utils';
import { authQueries } from '@/features/auth/queries';
import type { GameConfig } from '@/features/game/types';

export const getCollectedItemSlugs = async (
  gameConfig: GameConfig<unknown>
): Promise<string[]> => {
  const { user } = await authQueries.getAuth();
  if (!user) {
    return [];
  }

  if (!gameConfig.dataUtils) {
    throw new Error(
      'Game data utility functions not found for the provided game configuration'
    );
  }

  try {
    return await gameConfig.dataUtils.getCollectedItemSlugs();
  } catch (error) {
    fromErrorToActionState({ error });
    return [];
  }
};
