import { createContext, PropsWithChildren, useContext } from 'react';

import { useMe } from '../../hooks/use-me';
import { LoginPage } from '../pages/login';

type AuthContextType = {
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const profile = useMe();

  const onLogin = async () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;
  };

  const onLogout = async () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`;
  };

  const value = {
    login: onLogin,
    logout: onLogout,
  };

  return <AuthContext.Provider value={value}>{profile.data ? children : <LoginPage />}</AuthContext.Provider>;
}
