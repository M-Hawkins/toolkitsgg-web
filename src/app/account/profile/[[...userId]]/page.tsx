import { PageLayout } from '@/components/PageLayout';
import { authQueries } from '@/features/auth/queries';

type AccountProfilePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AccountProfilePage({
  params,
}: AccountProfilePageProps) {
  const session = await authQueries.getAuth();
  const user = session?.user;

  const { slug } = await params;

  if (!user?.id && !slug) {
    throw new Error('User not found');
  }

  const userId = slug ? slug[0] : user?.id;

  return (
    <PageLayout user={user} gameId={undefined}>
      USer profile page for {userId}
    </PageLayout>
  );
}
