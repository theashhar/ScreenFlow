import { AuthResponse, User } from '@supabase/supabase-js';
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

type AuthState = 'loading' | 'unauthenticated' | 'onboarding' | 'authenticated';

type AuthContextValue = {
  authState: AuthState;
  user: AuthResponse['data'] | null;
  login: (user: AuthResponse['data'] | null) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [user, setUser] = useState<AuthResponse['data'] | null>(null);

  useEffect(() => {
    // TODO: replace with real bootstrap (read token, fetch user, check onboarding)
    const bootstrap = async () => {
      // For now, start with unauthenticated state to show the auth flow
      setAuthState('unauthenticated');
    };
    bootstrap();
  }, []);

  const login = async (user: AuthResponse['data'] | null) => {
    // TODO: persist token, fetch user, decide if onboarding is needed
    // setUser(fetchedUser)
    // setAuthState('onboarding' | 'authenticated')
    setAuthState('authenticated');
    setUser(user);
  };

  const logout = () => {
    // TODO: clear token, state, etc.
    setUser(null);
    setAuthState('unauthenticated');
  };
  console.log('authState', authState);
  console.log('user', user);

  const value = useMemo(() => ({ authState, user, login, logout }), [authState, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
