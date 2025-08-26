'use server';

import 'server-only';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { authQueries } from '@/features/auth/queries';
import { emailVerificationPath, signInPath } from '@/paths';

type GetAuthOrRedirectOptions = {
  checkEmailVerified?: boolean;
};

export const getAuthOrRedirect = cache(
  async (options?: GetAuthOrRedirectOptions) => {
    const { checkEmailVerified = true } = options ?? {};

    const auth = await authQueries.getAuth();

    if (!auth.user) {
      redirect(signInPath());
    }

    if (checkEmailVerified && !auth.user.emailVerified) {
      redirect(emailVerificationPath());
    }

    return { ...auth };
  }
);
