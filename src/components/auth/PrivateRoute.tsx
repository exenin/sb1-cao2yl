import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function PrivateRoute({ children, adminOnly = false }: PrivateRouteProps) {
  const location = useLocation();
  
  // Simplified auth check for demo purposes
  const isAuthenticated = true; // Replace with actual auth logic
  const isAdmin = true; // Replace with actual admin check

  if (!isAuthenticated) {
    return <Navigate to={adminOnly ? "/admin/login" : "/login"} state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}