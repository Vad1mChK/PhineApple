import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store';
import {JSX} from "react";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
    const isAuth = useAppSelector((s) => s.auth.isAuthenticated);
    return isAuth ? children : <Navigate to="/login" replace />;
}
