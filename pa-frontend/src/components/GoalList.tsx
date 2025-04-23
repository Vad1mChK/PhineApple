import {Box, Button, List, ListItem, ListItemText, Paper, TextField, Typography} from '@mui/material';
import { Habit } from '../types/habit';
import React, {useState} from "react";

interface Props {
    habits: Habit[];
    date: string;
    onAdd?: (name: string, date: string) => void;  // new prop
}

const GoalList: React.FC<Props> = ({
   habits,
   date,
   onAdd = () => {},            // ← default to a no-op if not passed :contentReference[oaicite:0]{index=0}
}) => {
    const [newGoal, setNewGoal] = useState('');

    const handleAdd = () => {
        if (!newGoal.trim()) return;
        onAdd(newGoal.trim(), date);
        setNewGoal('');
    };

    return (
        <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Completed goals on {date}
            </Typography>

            {/* Add New Goal Form */}
            <Box sx={{ display: 'flex', mb: 2, gap: 1 }}>
                <TextField
                    label="New goal"
                    variant="outlined"
                    size="small"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    fullWidth
                />  {/* TextField API: complete form control with label and input :contentReference[oaicite:1]{index=1} */}
                <Button
                    variant="contained"
                    onClick={handleAdd}
                    disabled={!newGoal.trim()}
                >
                    Add
                </Button>  {/* Buttons communicate actions; placed next to forms :contentReference[oaicite:2]{index=2} */}
            </Box>

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

export default GoalList;