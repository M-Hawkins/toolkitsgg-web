'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { setCookieByKey } from '@/actions/cookies';
import type { ActionState } from '@/components/form/types';
import { fromErrorToActionState, toActionState } from '@/components/form/utils';
import { authMutations } from '@/features/auth/mutations';
import { authQueries } from '@/features/auth/queries';
import { validateEmailVerificationCode } from '@/features/auth/utils/validate-email-verification-code';
import { createSession } from '@/lib/lucia';
import { homePath } from '@/paths';
import { generateRandomToken } from '@/utils/crypto';
import { setSessionCookie } from '../utils/session-cookie';

const emailVerificationSchema = z.object({
  code: z.string().length(8),
});

export const emailVerification = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await authQueries.getAuthOrRedirect({
    checkEmailVerified: false,
  });

  try {
    const { code } = emailVerificationSchema.parse({
      code: formData.get('code'),
    });

    const validCode = await validateEmailVerificationCode(
      user.id,
      user.email,
      code
    );

    if (!validCode) {
      return toActionState({
        status: 'ERROR',
        message: 'Invalid or expired code',
      });
    }

    await authMutations.deleteUserSessions({ userId: user.id });

    await authMutations.updateUser({
      userId: user.id,
      data: { emailVerified: true },
    });

    const sessionToken = generateRandomToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    return fromErrorToActionState({ error });
  }

  await setCookieByKey('toast', 'Email verified');
  // TODO: Redirect to a more appropriate page, like the dashboard or profile
  redirect(homePath());
};
