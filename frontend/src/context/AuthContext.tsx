import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '../api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
  error: string | null; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const verifyToken = async () => {
      if (token && !user) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const response = await apiClient.get('/api/user');
          setUser(response.data);
          console.log('User data from token verification:', response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
          setError(null); 
        } catch (error) {
          let errorMessage = 'Terjadi kesalahan saat memverifikasi token';
          if (error instanceof Error) {
            errorMessage = error.message || errorMessage;
          }
          setError(errorMessage);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, [token, user]);

  const login = (userData: User, userToken: string) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
    setError(null); 
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setError(null); 
    delete apiClient.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading, error }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};