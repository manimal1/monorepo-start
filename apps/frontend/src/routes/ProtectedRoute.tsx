import { Navigate, Outlet } from 'react-router';
import { HydrateFallback } from '~/layouts/HydrateFallback';

import { useAuth } from '~/providers/AuthProvider';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <HydrateFallback />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
