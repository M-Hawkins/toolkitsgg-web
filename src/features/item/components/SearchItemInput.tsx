import { Loader, Select } from '@mantine/core';
import type { BaseItemType } from '@/features/item/types';

const itemToData = (item: BaseItemType) => ({
  label: item.name,
  value: item.slug,
});

type SearchItemInputProps<ItemType extends BaseItemType> = {
  items: ItemType[];
  loading: boolean;
  searchValue: string;
  onSearchChange: (query: string) => void;
};

const SearchItemInput = <ItemType extends BaseItemType>({
  items,
  loading,
  searchValue,
  onSearchChange,
}: SearchItemInputProps<ItemType>) => {
  const data = items.map(itemToData);

  return (
    <Select
      searchable
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      label="Search items"
      placeholder="Search for an item"
      rightSection={loading ? <Loader size={16} /> : null}
      data={data}
      nothingFoundMessage="No items found"
    />
  );
};

export { SearchItemInput };
