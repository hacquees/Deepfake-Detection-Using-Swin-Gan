import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthStatus } from '../types';
import axios from 'axios';

interface AuthContextType {
  status: AuthStatus;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => void;
  loginWithMicrosoft: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:5000'; // Adjust to your backend URL

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/api/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Backend returns id as number, and other fields are optional
          setUser({
            ...response.data,
            id: response.data.id, // Already a number
            dateJoined: response.data.dateJoined || '', // Provide default if missing
            detectionCount: response.data.detectionCount || 0, // Provide default if missing
            avatarUrl: response.data.avatarUrl || '', // Provide default if missing
          });
          setStatus('authenticated');
        } catch {
          localStorage.removeItem('token');
          setStatus('unauthenticated');
        }
      } else {
        setStatus('unauthenticated');
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      setUser({
        ...response.data.user,
        dateJoined: response.data.user.dateJoined || '',
        detectionCount: response.data.user.detectionCount || 0,
        avatarUrl: response.data.user.avatarUrl || '',
      });
      setStatus('authenticated');
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/signup`, { name, email, password });
      localStorage.setItem('token', response.data.token);
      setUser({
        ...response.data.user,
        dateJoined: response.data.user.dateJoined || '',
        detectionCount: response.data.user.detectionCount || 0,
        avatarUrl: response.data.user.avatarUrl || '',
      });
      setStatus('authenticated');
    } catch (error) {
      throw new Error('Could not create account');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setStatus('unauthenticated');
  };

  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/auth/google`; // Redirect to Google OAuth
  };

  const loginWithMicrosoft = () => {
    window.location.href = `${API_URL}/auth/microsoft`; // Redirect to Microsoft OAuth
  };

  return (
    <AuthContext.Provider value={{ status, user, login, signup, logout, loginWithGoogle, loginWithMicrosoft }}>
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