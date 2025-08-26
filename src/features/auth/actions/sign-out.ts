'use server';

import { redirect } from 'next/navigation';
import { authQueries } from '@/features/auth/queries';
import { invalidateSession } from '@/lib/lucia';
import { signInPath } from '@/paths';
import { deleteSessionCookie } from '../utils/session-cookie';

export const signOut = async () => {
  const { session } = await authQueries.getAuth();

  if (!session) {
    redirect(signInPath());
  }

  await invalidateSession(session.id);
  await deleteSessionCookie();

  redirect(signInPath());
};
