import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredPermissions = [] }) => {
  const { user, hasPermission } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermissions.length > 0 && !requiredPermissions.every(hasPermission)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;