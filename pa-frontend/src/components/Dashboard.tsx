import { Container, Typography, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../features/authSlice';

export default function Dashboard() {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();

    return (
        <Container sx={{ mt: 8 }}>
            <Typography variant="h4">Welcome, {user?.email}</Typography>
            <Button variant="outlined" onClick={() => dispatch(logout())} sx={{ mt: 2 }}>
                Logout
            </Button>
        </Container>
    );
}
