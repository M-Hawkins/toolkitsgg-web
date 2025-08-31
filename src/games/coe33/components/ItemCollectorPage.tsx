'use client';

import { Box, Flex, Skeleton, Stack } from '@mantine/core';
import { motion } from 'framer-motion';
import { useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';
import { searchParser } from '@/app/search-params';
import { allGameConfigs } from '@/features/game/constants';
import type { GameConfig } from '@/features/game/types';
import { CompactItemCard } from '@/features/item/components/CompactItemCard';
import { SearchItemInput } from '@/features/item/components/SearchItemInput';
import type { COE33ItemType } from '@/games/coe33/items/types';
import { getImageUrl } from '@/utils/url';

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

  const [search, setSearch] = useQueryState('search', searchParser);
  const [loading, setLoading] = useState(false);

  const items = useMemo(
    () => findNewItems(gameConfig?.items ?? [], search, defaultItems),
    [search, defaultItems, gameConfig?.items]
  );

  const handleSearchChange = (value: string) => {
    setSearch(value.trim());
  };

  return (
    <Stack>
      <Box maw={600}>
        <SearchItemInput
          key={search}
          items={items}
          searchValue={search}
          onSearchChange={handleSearchChange}
          onLoadingChange={setLoading}
        />
      </Box>

      <Flex wrap="wrap" align="stretch" justify="space-between" gap="sm">
        {loading
          ? Array.from({ length: 32 }).map((_, index) => (
              <Skeleton key={index} height={250} width={150} />
            ))
          : items.map((item) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CompactItemCard
                  item={item}
                  imageSrc={getImageUrl(item.imageUrl, 'coe33')}
                />
              </motion.div>
            ))}
      </Flex>
    </Stack>
  );
};

export { ItemCollectorPage };
