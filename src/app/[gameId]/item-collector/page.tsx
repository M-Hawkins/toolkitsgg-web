import { PageLayout } from '@/components/PageLayout';
import { authData } from '@/features/auth/data';
import { gameUtils } from '@/features/game/utils';

type ItemCollectorPageProps = {
  params: Promise<{ gameId: string }>;
};

export default async function ItemCollectorPage({
  params,
}: ItemCollectorPageProps) {
  const session = await authData.getAuth();
  const user = session?.user;

  const { gameId } = await params;
  const isGameIdValid = gameUtils.isGameId(gameId);

  if (!isGameIdValid) {
    throw new Error(`Invalid game id: ${gameId}`);
  }

  const gameConfig = gameUtils.toGameConfig(gameId);

  if (!gameConfig) {
    throw new Error(`Game configuration not found for game id ${gameId}!`);
  }

  if (!gameConfig.pages?.itemCollector) {
    throw new Error(
      `Game configuration for game id ${gameId} is missing page components!`
    );
  }

  return (
    <>
      <PageLayout user={user} gameId={gameId}>
        {gameConfig.pages.itemCollector.component}
      </PageLayout>
    </>
  );
}
