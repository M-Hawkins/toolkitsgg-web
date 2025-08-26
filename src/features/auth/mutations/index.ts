import * as createEmailVerificationToken from './create-email-verification-token';
import * as createPasswordResetToken from './create-password-reset-token';
import * as createUser from './create-user';
import * as createUserSession from './create-user-session';
import * as deleteEmailVerificationTokens from './delete-email-verification-tokens';
import * as deletePasswordResetToken from './delete-password-reset-token';
import * as deleteSession from './delete-session';
import * as deleteUser from './delete-user';
import * as deleteUserSessions from './delete-user-sessions';
import * as updateSession from './update-session';
import * as updateUser from './update-user';

export const authMutations = {
  ...createEmailVerificationToken,
  ...createPasswordResetToken,
  ...createUser,
  ...createUserSession,
  ...deleteEmailVerificationTokens,
  ...deletePasswordResetToken,
  ...deleteSession,
  ...deleteUser,
  ...deleteUserSessions,
  ...updateSession,
  ...updateUser,
};
