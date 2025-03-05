import { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { useAppDispatch } from '../store';
import { registerUser } from '../features/authSlice';
import { Link } from 'react-router-dom';

export default function Register() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        dispatch(registerUser({ email, password }));
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Register
                </Typography>
                <TextField fullWidth label="Email" type="email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" onClick={handleRegister} sx={{ mt: 2 }} fullWidth>
                    Register
                </Button>
                <Typography sx={{ mt: 2 }}>
                    Already have an account? <Link to="/">Login</Link>
                </Typography>
            </Paper>
        </Container>
    );
}
