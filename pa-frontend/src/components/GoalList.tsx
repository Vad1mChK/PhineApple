import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { Habit } from '../types/habit';

interface Props {
    habits: Habit[];
    date: string;
}

export default function GoalList({ habits, date }: Props) {
    return (
        <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Completed goals on {date}
            </Typography>
            <List dense>
                {habits.length === 0 && <Typography>No goals yet 😴</Typography>}
                {habits.map((h) => (
                    <ListItem key={h.id}>
                        <ListItemText primary={h.name} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}
