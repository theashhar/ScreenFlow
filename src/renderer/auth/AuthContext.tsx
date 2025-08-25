import { AuthResponse, User } from '@supabase/supabase-js';
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { supabase } from '@/renderer/supabase/supabaseClient';

type AuthState = 'loading' | 'unauthenticated' | 'onboarding' | 'authenticated';

type AuthContextValue = {
  authState: AuthState;
  user: AuthResponse['data'] | null;
  login: (user: AuthResponse['data'] | null) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [user, setUser] = useState<AuthResponse['data'] | null>(null);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        // Check for existing session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error);
          setAuthState('unauthenticated');
          return;
        }

        if (session) {
          // User has an active session, set as authenticated
          setUser({ user: session.user, session });
          setAuthState('authenticated');
        } else {
          // No session found, user needs to login
          console.log('No existing session found');
          setAuthState('unauthenticated');
        }
      } catch (error) {
        console.error('Error during auth bootstrap:', error);
        setAuthState('unauthenticated');
      }
    };

    bootstrap();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);

        if (event === 'SIGNED_IN' && session) {
          setUser({ user: session.user, session });
          setAuthState('authenticated');
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setAuthState('unauthenticated');
        } else if (event === 'TOKEN_REFRESHED' && session) {
          setUser({ user: session.user, session });
          setAuthState('authenticated');
        }
      }
    );

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  const login = async (user: AuthResponse['data'] | null) => {
    // TODO: persist token, fetch user, decide if onboarding is needed
    // setUser(fetchedUser)
    // setAuthState('onboarding' | 'authenticated')
    setAuthState('authenticated');
    setUser(user);
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      }
      // State will be updated by the auth state listener
    } catch (error) {
      console.error('Error during logout:', error);
      // Fallback: manually update state
      setUser(null);
      setAuthState('unauthenticated');
    }
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
