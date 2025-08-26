'use server';

import { z } from 'zod';
import type { ActionState } from '@/components/form/types';
import { fromErrorToActionState, toActionState } from '@/components/form/utils';
import { authQueries } from '@/features/auth/queries';
import { inngest } from '@/lib/inngest';

const passwordForgotSchema = z.object({
  email: z.string().min(1, { message: 'Is required' }).max(191).email(),
});

export const passwordForgot = async (
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const { email } = passwordForgotSchema.parse({
      email: formData.get('email'),
    });

    const user = await authQueries.getUser({
      userEmail: email,
    });

    if (!user) {
      return toActionState({
        status: 'SUCCESS',
        message: 'Check your email for a reset link',
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
