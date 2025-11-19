import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, RoleCollection, Feature } from './types';
import { canAccess as checkAccess } from './roleMatrix';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [roleCollection, setRoleCollection] = useState<RoleCollection[]>([]);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('user');
    const storedRoles = localStorage.getItem('roleCollection');

    if (storedUser && storedRoles) {
      try {
        setUser(JSON.parse(storedUser));
        setRoleCollection(JSON.parse(storedRoles));
      } catch (error) {
        console.error('Failed to parse stored auth data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('roleCollection');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Replace with actual authentication against your SAP CAP backend
    // This is a mock implementation for development
    
    // Mock user data - replace with real API call
    const mockUser: User = {
      id: '1',
      name: 'Test User',
      email,
      roleCollection: email.includes('admin')
        ? ['Blending_Administrator']
        : ['Blending_User'],
    };

    setUser(mockUser);
    setRoleCollection(mockUser.roleCollection);

    // Store in localStorage for session persistence
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('roleCollection', JSON.stringify(mockUser.roleCollection));
  };

  const logout = () => {
    setUser(null);
    setRoleCollection([]);
    localStorage.removeItem('user');
    localStorage.removeItem('roleCollection');
  };

  const canAccess = (feature: Feature): boolean => {
    return checkAccess(roleCollection, feature);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        roleCollection,
        canAccess,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
