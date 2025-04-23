import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store';

export default function AuthRoutes() {
    const isAuth = useAppSelector((s) => s.auth.isAuthenticated);
    return isAuth ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
