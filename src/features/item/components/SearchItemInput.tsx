import { Select } from '@mantine/core';
import type { BaseItemType } from '@/features/item/types';

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
  const itemCategories = Array.from(
    new Set(items.map((item) => item.category))
  ).sort();

  const data = itemCategories.map((category) => ({
    group: category,
    items: items
      .filter((item) => item.category === category)
      .map((item) => ({
        label: item.name,
        value: item.slug,
      })),
  }));

  return (
    <Select
      searchable
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      label="Search items"
      placeholder="Search for an item"
      data={data}
      nothingFoundMessage="No items found"
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
    />
  );
};

export { SearchItemInput };
