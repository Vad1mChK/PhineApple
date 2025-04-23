import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
// import { useTheme } from '@mui/material';
import { subDays } from 'date-fns';
import { DailySummary } from '../types/habit';

interface Props {
    data: DailySummary[];
    onClick(date: string): void;
}

export default function Heatmap({ data, onClick }: Props) {
    // const theme = useTheme();
    const today = new Date();
    const startDate = subDays(today, 180);

    return (
        <ReactCalendarHeatmap
            startDate={startDate}
            endDate={today}
            values={data.map((d) => ({ date: d.date, count: d.completedCount }))}
            gutterSize={3}
            showWeekdayLabels
            onClick={(v) => v && onClick(v.date)}
            classForValue={(v) => {
                if (!v || v.count === 0) return 'color-empty';
                if (v.count < 2) return 'color-scale-1';
                if (v.count < 4) return 'color-scale-2';
                if (v.count < 6) return 'color-scale-3';
                return 'color-scale-4';
            }}
            // tooltipDataAttrs={(v) => {
            //     if (!v) return {};
            //     return { 'data-tip': `${v.date}: ${v.count} done` };
            // }}
            // style={{
            //     // override default colors with MUI palette
            //     ['--react-calendar-heatmap-color-empty']: theme.palette.grey[300],
            //     ['--react-calendar-heatmap-color-scale-1']: theme.palette.success.light,
            //     ['--react-calendar-heatmap-color-scale-2']: theme.palette.success.main,
            //     ['--react-calendar-heatmap-color-scale-3']: theme.palette.success.dark,
            //     ['--react-calendar-heatmap-color-scale-4']: theme.palette.success.dark,
            // }}
        />
    );
}
