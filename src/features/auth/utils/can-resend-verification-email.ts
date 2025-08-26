import { differenceInSeconds } from 'date-fns';
import { authQueries } from '@/features/auth/queries';

export const canResendVerificationEmail = async (userId: string) => {
  const verificationToken = await authQueries.getEmailVerificationToken({
    userId,
  });

  if (!verificationToken) {
    return true;
  }

  const diff = differenceInSeconds(
    new Date(),
    new Date(verificationToken.createdAt)
  );

  return diff > 60;
};
