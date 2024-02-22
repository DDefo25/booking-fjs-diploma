import { Navigate, Outlet } from "react-router-dom";
import { selectAuth } from "../../features/slices/authSlice"
import { useTypedSelector } from "../../store/store"
import { Role } from "../../config/roles.enum";
import { useCheckRoles } from "../../hooks/useCheckRoles";

export const ProtectedRoute = ({ roles, children } : { roles: Role[], children: any }) => {
    const isAllow = useCheckRoles()

    if ( !isAllow(roles) ) {
        return <Navigate to='/' replace />;
      }

    return children ? children : <Outlet />
} 