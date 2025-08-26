'use server';

import { z } from 'zod';
import type { ActionState } from '@/components/form/types';
import { fromErrorToActionState, toActionState } from '@/components/form/utils';
import { authQueries } from '@/features/auth/queries';
import { inngest } from '@/lib/inngest';
import { verifyPasswordHash } from '../utils/hash-and-verify';

const passwordChangeSchema = z.object({
  password: z.string().min(6).max(191),
});

export const passwordChange = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const auth = await authQueries.getAuthOrRedirect();

  try {
    const { password } = passwordChangeSchema.parse({
      password: formData.get('password'),
    });

    const user = await authQueries.getUser({
      userEmail: auth.user.email,
    });

    if (!user) {
      // we should never reach this return statement
      // but it's here just in case
      return toActionState({
        status: 'ERROR',
        message: 'Invalid request',
        formData,
      });
    }

    const validPassword = await verifyPasswordHash(user.passwordHash, password);

    if (!validPassword) {
      return toActionState({
        status: 'ERROR',
        message: 'Incorrect password',
        formData,
      });
    }

    await inngest.send({
      name: 'app/password.password-reset',
      data: {
        userId: user.id,
      },
    });
  } catch (error) {
    return fromErrorToActionState({ error, formData });
  }

  return toActionState({
    status: 'SUCCESS',
    message: 'Check your email for a reset link',
  });
};
