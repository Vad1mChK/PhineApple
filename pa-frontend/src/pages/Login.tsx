import { useState } from 'react';
import { Avatar, Button, TextField, Grid, Box, Typography, Link, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import api from '../api/apiClient';
import { loginSuccess } from '../store/slices/authSlice';
import { useAppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // demo only: skip server call
            const res = await api.post('/auth/login', { email, password });
            dispatch(loginSuccess({ token: res.data.token, email }));
            navigate('/dashboard');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1 }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField margin="normal" required fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/register">Don't have an account? Sign Up</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
