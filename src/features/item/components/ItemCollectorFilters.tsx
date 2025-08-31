'use client';

import { ActionIcon, Box, Flex } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { useQueryState } from 'nuqs';
import { searchParser } from '@/app/search-params';
import { SearchItemInput } from '@/features/item/components/SearchItemInput';
import type { BaseItemType } from '@/features/item/types';

// TODO: Implement filters dialog

type ItemCollectorFiltersProps<T extends BaseItemType> = {
  onChangeLoading: (loading: boolean) => void;
  items: T[];
};

const ItemCollectorFilters = <T extends BaseItemType>({
  onChangeLoading,
  items,
}: ItemCollectorFiltersProps<T>) => {
  const [search, setSearch] = useQueryState('search', searchParser);

  const handleSearchChange = (value: string) => {
    setSearch(value.trim());
  };

  return (
    <Flex align="flex-end" justify="center" gap="md" w="100%">
      <Box maw={400} w="100%">
        <SearchItemInput
          key={search}
          items={items}
          searchValue={search}
          onSearchChange={handleSearchChange}
          onLoadingChange={onChangeLoading}
        />
      </Box>
      <ActionIcon variant="filled" aria-label="Filters" h={36} w={48}>
        <IconFilter style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </Flex>
  );
};

export { ItemCollectorFilters };
