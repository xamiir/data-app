import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@/types/database';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signUp: (phoneNumber: string, password: string) => Promise<void>;
  signIn: (phoneNumber: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.session.user.id)
          .maybeSingle();
        setUser(userData);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (phoneNumber: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      phone: phoneNumber,
      password,
    });

    if (error) throw error;

    if (data.user) {
      await supabase.from('users').insert({
        id: data.user.id,
        phone_number: phoneNumber,
        password_hash: '',
      });
      await checkUser();
    }
  };

  const signIn = async (phoneNumber: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      phone: phoneNumber,
      password,
    });

    if (error) throw error;
    await checkUser();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
