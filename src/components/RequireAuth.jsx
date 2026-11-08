import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const RequireAuth = ({ children }) => {
  const { user } = useStore();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
};

export default RequireAuth;
