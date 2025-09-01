'use client';

import { ActionIcon, Box, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter } from '@tabler/icons-react';
import { useQueryState } from 'nuqs';
import { searchParser } from '@/app/search-params';
import { AppModal } from '@/components/AppModal';
import { SearchItemInput } from '@/features/item/components/SearchItemInput';
import type { BaseItemType } from '@/features/item/types';

type ItemCollectorFiltersProps<ItemType extends BaseItemType> = {
  onChangeLoading: (loading: boolean) => void;
  children: React.ReactNode;
  items: ItemType[];
};

const ItemCollectorFilters = <ItemType extends BaseItemType>({
  onChangeLoading,
  items,
  children,
}: ItemCollectorFiltersProps<ItemType>) => {
  const [search, setSearch] = useQueryState('search', searchParser);

  const handleSearchChange = (value: string) => {
    setSearch(value.trim());
  };

  const [modalOpen, { toggle: toggleModal, close: closeModal }] =
    useDisclosure(false);

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
      <ActionIcon
        variant="filled"
        aria-label="Item filters"
        h={36}
        w={48}
        onClick={toggleModal}
      >
        <IconFilter style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
      <AppModal
        opened={modalOpen}
        title="Item filters"
        onClose={closeModal}
        size="md"
        radius="md"
        centered
        withCloseButton
      >
        {children}
      </AppModal>
    </Flex>
  );
};

export { ItemCollectorFilters };
