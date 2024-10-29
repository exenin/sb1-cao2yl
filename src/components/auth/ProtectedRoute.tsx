import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ProtectedRouteProps } from '../../types/auth';

export default function ProtectedRoute({
  children,
  requiredRoles = [],
  requiredPermissions = []
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    // Redirect to the appropriate login page based on the attempted route
    const loginPath = location.pathname.startsWith('/admin') ? '/admin/login' : '/login';
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    // Redirect admin users to admin dashboard and regular users to customer dashboard
    const redirectPath = user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  // Check if user has required permissions
  if (requiredPermissions.length > 0 && 
      !requiredPermissions.every(permission => user.permissions.includes(permission))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}