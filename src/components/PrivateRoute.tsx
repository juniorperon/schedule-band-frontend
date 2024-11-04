// src/components/PrivateRoute.tsx

import { useAuth } from '../shared/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? <>{children}</> : null;
};

export default PrivateRoute;
