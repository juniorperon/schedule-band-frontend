import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '../services/api';

interface User {
  id: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  errorMessage: string | null;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.accessToken);
      setUser(response.data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, isAuthenticated, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
