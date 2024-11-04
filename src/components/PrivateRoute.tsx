import { useAuth } from '../shared/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth() as AuthContextType;
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? <>{children}</> : null;
};

export default PrivateRoute;
