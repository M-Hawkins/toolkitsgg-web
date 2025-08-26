import * as getAuth from './get-auth';
import * as getAuthOrRedirect from './get-auth-or-redirect';
import * as getEmailVerificationToken from './get-email-verification-token';
import * as getPasswordResetToken from './get-password-reset-token';
import * as getSession from './get-session';
import * as getUser from './get-user';

export const authQueries = {
  ...getAuthOrRedirect,
  ...getAuth,
  ...getEmailVerificationToken,
  ...getPasswordResetToken,
  ...getSession,
  ...getUser,
};
