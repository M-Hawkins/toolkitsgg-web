import { authMutations } from '@/features/auth/mutations';
import { authQueries } from '@/features/auth/queries';
import { hashToken } from '@/utils/crypto';

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15; // 15 days
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2; // 30 days

export const createSession = async (sessionToken: string, userId: string) => {
  const sessionId = hashToken(sessionToken);

  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
  };

  await authMutations.createUserSession(session);

  return session;
};

export const validateSession = async (sessionToken: string) => {
  const sessionId = hashToken(sessionToken);

  const result = await authQueries.getSession({
    sessionId,
    options: {
      includeUser: true,
    },
  });

  if (!result) {
    return { session: null, user: null };
  }

  const { user, ...session } = result;

  const userProfileResult = await authQueries.getUser({
    userId: user.id,
    options: { includeUserProfile: true },
  });

  const userProfile = userProfileResult?.userProfile;

  // if the session is expired, delete it
  if (Date.now() >= session.expiresAt.getTime()) {
    await authMutations.deleteSession({ sessionId });

    return { session: null, user: null };
  }

  // if 15 days are left until the session expires, refresh the session
  if (Date.now() >= session.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS) {
    session.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);

    await authMutations.updateSession({
      sessionId,
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }

  return {
    session,
    user: {
      ...user,
      passwordHash: undefined, // Omit password hash for security
      userProfile,
    },
  };
};

export const invalidateSession = async (sessionId: string) => {
  await authMutations.deleteSession({ sessionId });
};
