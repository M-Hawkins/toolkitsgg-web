import { PageLayout } from '@/components/PageLayout';
import { getAuth } from '@/features/auth/queries/get-auth';

type AccountProfilePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AccountProfilePage({
  params,
}: AccountProfilePageProps) {
  const session = await getAuth();
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
