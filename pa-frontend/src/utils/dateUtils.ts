import {format, subDays} from 'date-fns';
import { parse } from 'date-fns';
import {DailySummary} from "../types/habit.ts";

/**
 * Parse a 'yyyy-MM-dd' string into a Date object.
 * @param dateString  Date string in 'yyyy-MM-dd' format
 * @returns           Date instance
 */
export function parseDate(dateString: string): Date {
    // the 3rd argument is a fallback 'baseDate' for missing values
    return parse(dateString, 'yyyy-MM-dd', new Date());
}


/**
 * Convert a Date object into a 'yyyy-MM-dd' string.
 * @param date  Date instance to format
 * @returns     Formatted date string (e.g. '2025-04-24')
 */
export function formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd');
}

export function lastNDates(n: number): string[] {
    const today = new Date();
    return Array.from({ length: n }).map((_, i) =>
        format(subDays(today, n - 1 - i), 'yyyy-MM-dd')
    );
}

/**
 * Merge your fetched summary with a full list of recent dates,
 * filling in count=0 for any missing days.
 */
export function padSummary(
    raw: DailySummary[],
    days: number
): DailySummary[] {
    const fullDates = lastNDates(days);
    const lookup = new Map(raw.map((d) => [d.date, d.completedCount]));

    return fullDates.map((date) => ({
        date,
        completedCount: lookup.get(date) ?? 0,
    }));
}