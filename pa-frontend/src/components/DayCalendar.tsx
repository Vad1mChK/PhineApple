import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';

interface Props {
    selected: string;
    onChange(next: string): void;
}

export default function DayCalendar({ selected, onChange }: Props) {
    return (
        <DatePicker
            label="Pick a day"
            value={selected}
            onChange={(val) => val && onChange(format(val as Date, 'yyyy-MM-dd'))}
            // renderInput={(params) => <TextField {...params} fullWidth sx={{ my: 2 }} />}
        />
    );
}
