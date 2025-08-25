'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { setCookieByKey } from '@/actions/cookies';
import type { ActionState } from '@/components/form/types';
import { formUtils } from '@/components/form/utils';
import { deleteUserSessions } from '@/features/auth/data/delete-user-sessions';
import { updateUser } from '@/features/auth/data/update-user';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { createSession } from '@/lib/lucia';
import { homePath } from '@/paths';
import { generateRandomToken } from '@/utils/crypto';
import { setSessionCookie } from '../utils/session-cookie';
import { validateEmailVerificationCode } from '../utils/validate-email-verification-code';

const emailVerificationSchema = z.object({
  code: z.string().length(8),
});

export const emailVerification = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect({
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
      return formUtils.toActionState({
        status: 'ERROR',
        message: 'Invalid or expired code',
      });
    }

    await deleteUserSessions({ userId: user.id });

    await updateUser({
      userId: user.id,
      data: { emailVerified: true },
    });

    const sessionToken = generateRandomToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    return formUtils.fromErrorToActionState({ error });
  }

  await setCookieByKey('toast', 'Email verified');
  // TODO: Redirect to a more appropriate page, like the dashboard or profile
  redirect(homePath());
};
