import { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { useAppDispatch } from '../store';
import { loginUser } from '../features/authSlice';
import { Link } from 'react-router-dom';

export default function Login() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        dispatch(loginUser({ email, password }));
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <TextField fullWidth label="Email" type="email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" onClick={handleLogin} sx={{ mt: 2 }} fullWidth>
                    Login
                </Button>
                <Typography sx={{ mt: 2 }}>
                    Don't have an account? <Link to="/register">Register</Link>
                </Typography>
            </Paper>
        </Container>
    );
}
