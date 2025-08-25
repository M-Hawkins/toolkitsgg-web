import { PageLayout } from '@/components/PageLayout';
import { authData } from '@/features/auth/data';

export default async function HomePage() {
  const session = await authData.getAuth();
  const user = session?.user;

  return (
    <PageLayout user={user} gameId="coe33">
      Home page
    </PageLayout>
  );
}

export { HomePage };
