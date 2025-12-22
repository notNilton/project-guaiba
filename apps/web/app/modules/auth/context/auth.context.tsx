import React, { createContext, useContext, useEffect, useState } from 'react';
import type { IAuthResponse, ILoginRequest } from '@project-valkyrie/interfaces';
import { api } from '../services/auth.service';

interface AuthContextType {
  user: IAuthResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: ILoginRequest) => Promise<IAuthResponse>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IAuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify token and get user profile
          const response = await api.get<IAuthResponse>('/auth/me');
          setUser(response.data);
        } catch (error) {
          console.error('Failed to restore session:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: ILoginRequest): Promise<IAuthResponse> => {
    try {
      const response = await api.post<{ accessToken: string; user: IAuthResponse }>('/auth/login', credentials);
      const { accessToken, user } = response.data;
      
      localStorage.setItem('token', accessToken);
      setUser(user);
      return user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      await api.post('/auth/register', data);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // Redirect logic can be handled here or by the consumer
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
