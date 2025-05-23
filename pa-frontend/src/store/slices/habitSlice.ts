import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/apiClient';
import { DailySummary, Habit } from '../../types/habit';
import { format, subDays } from 'date-fns';

// ────────────────────────────────────────────
// Async actions
// ────────────────────────────────────────────
export const fetchSummary = createAsyncThunk<DailySummary[]>('habits/summary', async () => {
    const today = new Date();
    const from = format(subDays(today, 180), 'yyyy-MM-dd');
    const to = format(today, 'yyyy-MM-dd');
    const { data } = await api.get<DailySummary[]>(
        `/habits/summary?from=${from}&to=${to}`,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
    return data;
});

export const fetchDayHabits = createAsyncThunk<Habit[], string>(
    'habits/dayHabits',
    async (date) => {
        const { data } = await api.get<Habit[]>(
            `/habits/${date}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        return data;
    },
);

/** Mark a habit complete on the given date, then refresh that day's habits */
export const completeHabit = createAsyncThunk<
    void,
    { name: string; date: string }
>(
    'habits/completeByName',
    async ({ name, date }, thunkAPI) => {
        await api.post(
            '/habits/completeByName',
            { name, date },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
        // After successful POST, re-fetch the habits for this date
        thunkAPI.dispatch(fetchDayHabits(date));
    }
);

// ────────────────────────────────────────────
// Slice
// ────────────────────────────────────────────
interface HabitState {
    summary: DailySummary[];
    dayHabits: Habit[];
    selectedDate: string; // YYYY-MM-DD
    loading: boolean;
    error: string | null;
}

const todayStr = format(new Date(), 'yyyy-MM-dd');

const initialState: HabitState = {
    summary: [],
    dayHabits: [],
    selectedDate: todayStr,
    loading: false,
    error: null,
};

const habitSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        setSelectedDate(state, { payload }: { payload: string }) {
            state.selectedDate = payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSummary.pending, (s) => {
                s.loading = true;
            })
            .addCase(fetchSummary.fulfilled, (s, a) => {
                s.summary = a.payload;
                s.loading = false;
            })
            .addCase(fetchSummary.rejected, (s, a) => {
                s.error = a.error.message || 'Error';
                s.loading = false;
            })
            .addCase(fetchDayHabits.fulfilled, (s, a) => {
                s.dayHabits = a.payload;
            })
            .addCase(completeHabit.pending, (s) => {
                s.loading = true;
            })
            .addCase(completeHabit.fulfilled, (s) => {
                // no direct state change—the fetchDayHabits dispatch will update dayHabits
                s.loading = false;
            })
            .addCase(completeHabit.rejected, (s, action) => {
                s.error = action.error.message || 'Error completing habit';
                s.loading = false;
            });
    },
});

export const { setSelectedDate } = habitSlice.actions;
export default habitSlice.reducer;
