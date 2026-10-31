import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type AuthResult = { error: string | null };

type AuthContextValue = {
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  username: string;
  hasAccount: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, username: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ACCOUNT_FLAG_KEY = 'lts_has_account';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccount, setHasAccount] = useState<boolean>(() => localStorage.getItem(ACCOUNT_FLAG_KEY) === 'true');

  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted) {
        setSession(data.session);
        if (data.session) localStorage.setItem(ACCOUNT_FLAG_KEY, 'true');
        setLoading(false);
      }
    };

    void restoreSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) {
        setSession(nextSession);
        if (nextSession) {
          localStorage.setItem(ACCOUNT_FLAG_KEY, 'true');
          setHasAccount(true);
        }
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return { error: error.message };

    setSession(data.session);
    localStorage.setItem(ACCOUNT_FLAG_KEY, 'true');
    setHasAccount(true);
    return { error: null };
  };

  const signUp = async (email: string, password: string, username: string): Promise<AuthResult> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (error) return { error: error.message };
    if (!data.session) return { error: 'Your account was created, but no active session is available yet.' };

    setSession(data.session);
    localStorage.setItem(ACCOUNT_FLAG_KEY, 'true');
    setHasAccount(true);
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem(ACCOUNT_FLAG_KEY);
    setHasAccount(false);
  };

  const isAdmin = session?.user.app_metadata?.role === 'admin';
  const username = String(session?.user.user_metadata?.username ?? '');

  return (
    <AuthContext.Provider value={{ session, loading, isAdmin, username, hasAccount, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
