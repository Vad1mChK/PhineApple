export interface DailySummary {
    date: string;          // YYYY-MM-DD
    completedCount: number;
}

export interface Habit {
    id: string;
    name: string;
    completedOn: string[]; // list of dates
}
