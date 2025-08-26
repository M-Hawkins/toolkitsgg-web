import { Flex, Paper } from '@mantine/core';
import { PageLayout } from '@/components/PageLayout';
import { authQueries } from '@/features/auth/queries';
import { PasswordResetForm } from '@/features/password/components/PasswordResetForm';
import classes from './Page.module.css';

type PasswordResetPageProps = {
  params: Promise<{
    tokenId: string;
  }>;
};

export default async function PasswordResetPage({
  params,
}: PasswordResetPageProps) {
  const session = await authQueries.getAuth();
  const user = session?.user;

  const { tokenId } = await params;

  return (
    <PageLayout user={user} gameId={undefined}>
      <Flex align="center" justify="center" p="xl">
        <Paper
          radius="md"
          p="lg"
          withBorder
          className={classes.paper}
          w="100%"
          maw="400px"
        >
          <PasswordResetForm tokenId={tokenId} />
        </Paper>
      </Flex>
    </PageLayout>
  );
}
