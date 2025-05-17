import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, AuthContextType } from '../types';

// Create the auth context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => Promise.resolve(),
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // For demo purposes, we're using mock data
    // In a real app, this would make an API call
    
    // Mock admin user
    if (email === 'admin@edtech.com' && password === 'password') {
      const adminUser = {
        id: '1',
        name: 'Admin User',
        email: 'admin@edtech.com',
        role: 'admin',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return;
    }
    
    // Mock mentor user
    if (email === 'mentor@edtech.com' && password === 'password') {
      const mentorUser = {
        id: '2',
        name: 'Jane Smith',
        email: 'mentor@edtech.com',
        role: 'mentor',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      };
      setUser(mentorUser);
      localStorage.setItem('user', JSON.stringify(mentorUser));
      return;
    }
    
    // If no matching user, throw error
    throw new Error('Invalid email or password');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);