import { useState } from 'react';
import { Avatar, Button, TextField, Grid, Box, Typography, Link, Container } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import api from '../api/apiClient';
import { loginSuccess } from '../store/slices/authSlice';
import { useAppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', { email, password });
            dispatch(loginSuccess({ token: res.data.token, email }));
            navigate('/dashboard');
        } catch (err) {
            alert('Registration failed');
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
                    <PersonAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField margin="normal" required fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Register
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid>
                            <Link href="/login">Already have an account? Log in</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
