'use client';

import { Flex, Stack } from '@mantine/core';
import { useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';
import { searchParser } from '@/app/search-params';
import { allGameConfigs } from '@/features/game/constants';
import type { GameConfig } from '@/features/game/types';
import { ItemCollectorFilters } from '@/features/item/components/ItemCollectorFilters';
import { ItemGrid } from '@/features/item/components/ItemGrid';
import type { COE33ItemType } from '@/games/coe33/items/types';

const findNewItems = (
  items: COE33ItemType[],
  query: string,
  defaultItems: COE33ItemType[]
): COE33ItemType[] => {
  if (!query) {
    return defaultItems;
  }

  const filteredItems = items
    ?.filter((item) =>
      item.name.toLowerCase().includes(query.trim().toLowerCase())
    )
    .filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.slug === item.slug)
    );

  return filteredItems;
};
const ItemCollectorPage = () => {
  const gameConfig = allGameConfigs.find(
    (config): config is GameConfig<COE33ItemType> => config.id === 'coe33'
  );

  if (!gameConfig || !gameConfig.items) {
    throw new Error('Game configuration not found for COE33!');
  }

  const defaultItems = gameConfig.items;

  const [search] = useQueryState('search', searchParser);
  const [loading, setLoading] = useState(false);

  const items = useMemo(
    () => findNewItems(gameConfig?.items ?? [], search, defaultItems),
    [search, defaultItems, gameConfig?.items]
  );

  return (
    <Stack>
      <ItemCollectorFilters items={defaultItems} onChangeLoading={setLoading} />

      <Flex wrap="wrap" align="stretch" justify="center" gap="sm">
        <ItemGrid items={items} loading={loading} />
      </Flex>
    </Stack>
  );
};

export { ItemCollectorPage };
