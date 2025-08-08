import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

type AuthState = 'loading' | 'unauthenticated' | 'onboarding' | 'authenticated';

type User = { id: string; email: string } | null;

type AuthContextValue = {
  authState: AuthState;
  user: User;
  login: (token: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    // TODO: replace with real bootstrap (read token, fetch user, check onboarding)
    const bootstrap = async () => {
      // For now, skip auth and go directly to authenticated state
      // since we're moving existing functionality there
      setAuthState('authenticated');
      setUser({ id: '1', email: 'user@example.com' });
    };
    bootstrap();
  }, []);

  const login = async (token: string) => {
    // TODO: persist token, fetch user, decide if onboarding is needed
    // setUser(fetchedUser)
    // setAuthState('onboarding' | 'authenticated')
    setAuthState('authenticated');
    setUser({ id: '1', email: 'user@example.com' });
  };

  const logout = () => {
    // TODO: clear token, state, etc.
    setUser(null);
    setAuthState('unauthenticated');
  };

  const value = useMemo(() => ({ authState, user, login, logout }), [authState, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
