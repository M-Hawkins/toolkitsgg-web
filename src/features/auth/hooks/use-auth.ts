'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authQueries } from '@/features/auth/queries';
import type { UserWithProfile } from '@/features/auth/types';

const useAuth = () => {
  const [user, setUser] = useState<UserWithProfile>(null);
  const [isFetched, setFetched] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await authQueries.getAuth();
      setUser(user);
      setFetched(true);
    };

    fetchUser();
  }, [pathname]);

  return { user, isFetched };
};

export { useAuth };
