import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import { Feature } from '@/auth/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  feature?: Feature;
}

export function ProtectedRoute({ children, feature }: ProtectedRouteProps) {
  const { isAuthenticated, canAccess } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (feature && !canAccess(feature)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
