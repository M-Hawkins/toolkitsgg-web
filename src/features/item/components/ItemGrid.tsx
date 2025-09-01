import { Flex, Skeleton } from '@mantine/core';
import { motion } from 'framer-motion';
import { CompactItemCard } from '@/features/item/components/CompactItemCard';
import type { BaseItemType } from '@/features/item/types';
import { getImageUrl } from '@/utils/url';

const LoadingSkeleton = () =>
  Array.from({ length: 32 }).map((_, index) => (
    <Skeleton key={index} height={250} width={150} />
  ));

type ItemGridProps<ItemType extends BaseItemType> = {
  items: ItemType[];
  loading: boolean;
};

const ItemGrid = <ItemType extends BaseItemType>({
  items,
  loading,
}: ItemGridProps<ItemType>) => (
  <Flex wrap="wrap" align="stretch" justify="center" gap="sm">
    {loading ? (
      <LoadingSkeleton />
    ) : (
      items.map((item) => (
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
      ))
    )}
  </Flex>
);

export { ItemGrid };
