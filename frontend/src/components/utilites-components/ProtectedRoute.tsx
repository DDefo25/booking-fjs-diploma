import { Navigate, Outlet } from 'react-router-dom';
import { Role } from '../../config/roles.enum';
import { useCheckRoles } from '../../hooks/useCheckRoles';

export const ProtectedRoute = ({ roles, children } : { roles: Role[], children: any }) => {
  const isAllow = useCheckRoles();

  if ( !isAllow(roles) ) {
    return <Navigate to='/' replace />;
  }

  return children ? children : <Outlet />;
}; 