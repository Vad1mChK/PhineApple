import { useEffect } from 'react';
import { Grid, CircularProgress, Paper } from '@mui/material';
import Navbar from '../components/Navbar';
import Heatmap from '../components/Heatmap';
import ProgressChart from '../components/ProgressChart';
import DayCalendar from '../components/DayCalendar';
import GoalList from '../components/GoalList';
import { fetchSummary, fetchDayHabits, setSelectedDate } from '../store/slices/habitSlice';
import { useAppDispatch, useAppSelector } from '../store';

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const { summary, dayHabits, selectedDate, loading } = useAppSelector((s) => s.habits);

    // initial load
    useEffect(() => {
        dispatch(fetchSummary());
        dispatch(fetchDayHabits(selectedDate));
    }, [dispatch]);

    // when date changes
    useEffect(() => {
        dispatch(fetchDayHabits(selectedDate));
    }, [dispatch, selectedDate]);

    return (
        <>
            <Navbar />
            {loading ? (
                <CircularProgress sx={{ m: 4 }} />
            ) : (
                <Grid container spacing={2} sx={{ px: 2 }}>
                    <Grid item xs={12} md={12}>
                        <Paper sx={{ p: 2 }}>
                            <Heatmap
                                data={summary}
                                onClick={(date) => {
                                    dispatch(setSelectedDate(date));
                                }}
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Paper sx={{ p: 2 }}>
                            <ProgressChart data={summary} />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <DayCalendar selected={selectedDate} onChange={(d) => dispatch(setSelectedDate(d))} />
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <GoalList habits={dayHabits} date={selectedDate} />
                    </Grid>
                </Grid>
            )}
        </>
    );
}
