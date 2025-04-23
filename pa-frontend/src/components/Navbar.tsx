import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/slices/authSlice';

export default function Navbar() {
    const dispatch = useAppDispatch();
    const email = useAppSelector((s) => s.auth.email);

    return (
        <AppBar position="static" sx={{ mb: 2 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Habit Tracker
                </Typography>
                {email && <Typography sx={{ mr: 2 }}>{email}</Typography>}
                <Button color="inherit" onClick={() => dispatch(logout())}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}
