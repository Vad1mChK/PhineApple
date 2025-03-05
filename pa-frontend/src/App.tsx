import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { useAppSelector } from './store';

export default function App() {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/secret" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}
