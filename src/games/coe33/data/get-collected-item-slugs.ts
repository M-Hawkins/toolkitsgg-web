import { authQueries } from '@/features/auth/queries';
import prisma from '@/lib/prisma';

export const getCollectedItemSlugs = async (): Promise<string[]> => {
  const { user } = await authQueries.getAuth();
  if (!user) {
    return [];
  }

  const collectedItems = await prisma.cOE33CollectedItem.findMany({
    where: {
      userId: user.id,
    },
    include: {
      coe33Item: {
        select: {
          slug: true,
        },
      },
    },
  });

  return collectedItems.map((collectedItem) => collectedItem.coe33Item.slug);
};
