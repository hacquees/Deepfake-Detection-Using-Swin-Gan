import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthStatus } from '../types';

interface AuthContextType {
  status: AuthStatus;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
  dateJoined: '2023-01-15',
  detectionCount: 24,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in (e.g., from localStorage)
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setStatus('authenticated');
      } else {
        setStatus('unauthenticated');
      }
    };

    // Add a slight delay to simulate a real auth check
    const timeoutId = setTimeout(checkAuth, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, we would validate credentials with the backend
      // For now, we'll just set the mock user
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setStatus('authenticated');
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, we would create a new user with the backend
      // For now, we'll just set the mock user
      const newUser = { ...mockUser, name, email };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setStatus('authenticated');
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error('Could not create account');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setStatus('unauthenticated');
  };

  return (
    <AuthContext.Provider value={{ status, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};