import { Select } from '@mantine/core';
import type { BaseItemType } from '@/features/item/types';

const itemToData = (item: BaseItemType) => ({
  label: item.name,
  value: item.slug,
});

type SearchItemInputProps<ItemType extends BaseItemType> = {
  items: ItemType[];
  searchValue: string;
  onSearchChange: (query: string) => void;
};

const SearchItemInput = <ItemType extends BaseItemType>({
  items,
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
      data={data}
      nothingFoundMessage="No items found"
    />
  );
};

export { SearchItemInput };
