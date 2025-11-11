import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  phone_number: string;
  full_name?: string;
}

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
    // Mock: always logged in with static user
    setUser({ id: '1', phone_number: '+1234567890', full_name: 'John Doe' });
    setIsLoading(false);
  }, []);

  const signUp = async (phoneNumber: string, password: string) => {
    // Mock signup
    setUser({ id: '1', phone_number: phoneNumber });
  };

  const signIn = async (phoneNumber: string, password: string) => {
    // Mock signin
    setUser({ id: '1', phone_number: phoneNumber });
  };

  const signOut = async () => {
    // Mock signout - but since static, maybe do nothing or set to null
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
