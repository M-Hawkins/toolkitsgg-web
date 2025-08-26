import { PageLayout } from '@/components/PageLayout';
import { authQueries } from '@/features/auth/queries';

export default async function HomePage() {
  const session = await authQueries.getAuth();
  const user = session?.user;

  return (
    <PageLayout user={user} gameId="coe33">
      Home page
    </PageLayout>
  );
}

export { HomePage };
