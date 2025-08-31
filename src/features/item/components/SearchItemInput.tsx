import { Loader, Select } from '@mantine/core';
import { useRef, useState } from 'react';
import type { BaseItemType } from '@/features/item/types';

type SearchItemInputProps<ItemType extends BaseItemType> = {
  items: ItemType[];
  searchValue: string;
  onSearchChange: (query: string) => void;
  onLoadingChange?: (loading: boolean) => void;
};

const SearchItemInput = <ItemType extends BaseItemType>({
  items,
  searchValue,
  onSearchChange,
  onLoadingChange,
}: SearchItemInputProps<ItemType>) => {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState(searchValue);
  const [loading, setLoading] = useState(false);

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

  const handleSearchChange = (query: string) => {
    window.clearTimeout(timeoutRef.current);

    setValue(query);
    setLoading(true);
    onLoadingChange?.(true);

    timeoutRef.current = window.setTimeout(() => {
      onSearchChange(query);
      setLoading(false);
      onLoadingChange?.(false);
    }, 1000);
  };

  return (
    <Select
      searchable
      searchValue={value}
      onSearchChange={handleSearchChange}
      rightSection={loading ? <Loader size={16} /> : null}
      label="Search items"
      placeholder="Search for an item"
      data={data}
      nothingFoundMessage="No items found"
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
    />
  );
};

export { SearchItemInput };
