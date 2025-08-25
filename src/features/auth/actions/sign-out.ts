'use server';

import { redirect } from 'next/navigation';
import { getAuth } from '@/features/auth/queries/get-auth';
import { invalidateSession } from '@/lib/lucia';
import { signInPath } from '@/paths';
import { deleteSessionCookie } from '../utils/session-cookie';

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath());
  }

  await invalidateSession(session.id);
  await deleteSessionCookie();

  redirect(signInPath());
};
