'use client';

import { Box, Card, Image, Stack, Text } from '@mantine/core';
import NextImage from 'next/image';
import type { BaseItemType } from '@/features/item/types';
import classes from './CompactItemCard.module.css';

type ImageProps =
  | {
      imageSrc: string;
      imageContent?: undefined;
    }
  | {
      imageSrc?: undefined;
      imageContent: React.ReactNode;
    };

export type CompactItemCardItemType = BaseItemType;

const ItemDescription = ({
  itemDescription,
}: {
  itemDescription: CompactItemCardItemType['description'];
}) => {
  if (typeof itemDescription === 'string') {
    return (
      <Text
        mt="xs"
        mb="sm"
        fz="xs"
        fw="normal"
        lh={1.3}
        lineClamp={3}
        className={classes.itemDescription}
      >
        {itemDescription}
      </Text>
    );
  }

  return itemDescription
    .filter((desc) => desc !== '')
    .map((desc) => (
      <Text
        mt="xs"
        mb="sm"
        fz="xs"
        fw="normal"
        key={desc}
        lh={1.3}
        lineClamp={3}
        className={classes.itemDescription}
      >
        {desc}
      </Text>
    ));
};

export type ItemCardProps = {
  item: CompactItemCardItemType;
} & ImageProps;

const CompactItemCard = ({ item, imageSrc, imageContent }: ItemCardProps) => {
  return (
    <Card withBorder radius="md" w="180px" h="100%" className={classes.card}>
      <Card.Section className={classes.imageContainer}>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={`Image of ${item.name}`}
            width={120}
            height={120}
            component={NextImage}
            className={classes.image}
          />
        )}
        {imageContent}
      </Card.Section>
      <Stack
        justify="flex-start"
        align="stretch"
        px="xs"
        py="sm"
        gap={4}
        style={{ flex: 1 }}
      >
        <Box h={48} mah={48}>
          <Text
            fz="md"
            fw="bolder"
            ta="left"
            lh={1}
            mb={4}
            lineClamp={2}
            className={classes.itemName}
          >
            {item.name}
          </Text>

          <Text fz="xs" fw="bold" lh={1.1} className={classes.itemCategory}>
            {item.category}
          </Text>
        </Box>
        <Box style={{ flex: 1, overflowY: 'auto' }}>
          <ItemDescription itemDescription={item.description} />
        </Box>
      </Stack>
    </Card>
  );
};

export { CompactItemCard };
