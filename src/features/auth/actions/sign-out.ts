'use server';

import { redirect } from 'next/navigation';
import { authData } from '@/features/auth/data';
import { invalidateSession } from '@/lib/lucia';
import { signInPath } from '@/paths';
import { deleteSessionCookie } from '../utils/session-cookie';

export const signOut = async () => {
  const { session } = await authData.getAuth();

  if (!session) {
    redirect(signInPath());
  }

  await invalidateSession(session.id);
  await deleteSessionCookie();

  redirect(signInPath());
};
