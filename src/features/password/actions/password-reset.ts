'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { setCookieByKey } from '@/actions/cookies';
import type { ActionState } from '@/components/form/types';
import { fromErrorToActionState, toActionState } from '@/components/form/utils';
import { authMutations } from '@/features/auth/mutations';
import { authQueries } from '@/features/auth/queries';
import { signInPath } from '@/paths';
import { hashToken } from '@/utils/crypto';
import { hashPassword } from '../utils/hash-and-verify';

const passwordResetSchema = z
  .object({
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export const passwordReset = async (
  tokenId: string,
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const { password } = passwordResetSchema.parse({
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    const tokenHash = hashToken(tokenId);

    const passwordResetToken = await authQueries.getPasswordResetToken({
      tokenHash,
    });

    if (passwordResetToken) {
      await authMutations.deletePasswordResetToken({
        tokenHash: passwordResetToken.tokenHash,
      });
    }

    if (
      !passwordResetToken ||
      Date.now() > passwordResetToken.expiresAt.getTime()
    ) {
      return toActionState({
        status: 'ERROR',
        message: 'Expired or invalid verification token',
        formData,
      });
    }

    await authMutations.deleteUserSessions({
      userId: passwordResetToken.userId,
    });

    const passwordHash = await hashPassword(password);

    await authMutations.updateUser({
      userId: passwordResetToken.userId,
      data: {
        passwordHash,
      },
    });
  } catch (error) {
    return fromErrorToActionState({ error, formData });
  }

  await setCookieByKey('toast', 'Successfully reset password');
  redirect(signInPath());
};
