'use server';

import { fromErrorToActionState, toActionState } from '@/components/form/utils';
import { authQueries } from '@/features/auth/queries';
import { sendEmailVerification } from '../emails/send-email-verification';
import { canResendVerificationEmail } from '../utils/can-resend-verification-email';
import { generateEmailVerificationCode } from '../utils/generate-email-verification-code';

export const emailVerificationResend = async () => {
  const { user } = await authQueries.getAuthOrRedirect({
    checkEmailVerified: false,
  });

  try {
    const canResend = await canResendVerificationEmail(user.id);
    if (!canResend) {
      return toActionState({
        status: 'ERROR',
        message:
          'You can only resend the verification email once every minute.',
      });
    }

    const verificationCode = await generateEmailVerificationCode(
      user.id,
      user.email
    );

    const result = await sendEmailVerification(
      user.username,
      user.email,
      verificationCode
    );

    if (result.error) {
      return toActionState({
        status: 'ERROR',
        message: 'Failed to send verification email',
      });
    }
  } catch (error) {
    return fromErrorToActionState({ error });
  }

  return toActionState({
    status: 'SUCCESS',
    message: 'Verification email has been sent',
  });
};
