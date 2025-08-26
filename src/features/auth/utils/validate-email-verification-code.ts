import { authMutations } from '@/features/auth/mutations';
import { authQueries } from '@/features/auth/queries';

export const validateEmailVerificationCode = async (
  userId: string,
  email: string,
  code: string
) => {
  const emailVerificationToken = await authQueries.getEmailVerificationToken({
    userId,
  });

  if (!emailVerificationToken || emailVerificationToken.code !== code) {
    return false;
  }

  await authMutations.deleteEmailVerificationTokens({
    id: emailVerificationToken.id,
  });

  const isExpired = Date.now() > emailVerificationToken.expiresAt.getTime();
  if (isExpired) {
    return false;
  }

  if (emailVerificationToken.email !== email) {
    return false;
  }

  return true;
};
