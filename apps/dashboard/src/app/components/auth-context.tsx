import Cookies from 'js-cookie';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { LoginPage } from '../pages/login';

type AuthContextType = {
  authenticated: boolean;
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
  const [authenticated, setAuthenticated] = useState(false);

  const onLogin = async () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;
  };

  const onLogout = async () => {
    setAuthenticated(false);
    Cookies.remove('jwt');
  };

  const value = {
    authenticated,
    login: onLogin,
    logout: onLogout,
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const jwt = query.get('jwt');
    if (jwt) {
      Cookies.set('jwt', jwt);
      window.location.search = '';
      setAuthenticated(true);
    } else if (Cookies.get('jwt')) {
      setAuthenticated(true);
    }
  }, []);

  return <AuthContext.Provider value={value}>{authenticated ? children : <LoginPage />}</AuthContext.Provider>;
}
