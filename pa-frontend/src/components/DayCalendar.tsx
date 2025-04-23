// src/components/DayCalendar.tsx
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

interface Props {
    selected: Date;
    onChange: (next: Date) => void;
}

export default function DayCalendar({ selected, onChange }: Props) {
    return (
        <DatePicker
            label="Pick a day"
            value={selected}
            onChange={(val: Date | null) => {
                if (val) {
                    onChange(val);
                }
            }}
            slots={{ textField: TextField }}
            slotProps={{ textField: { fullWidth: true, sx: { my: 2 } } }}
        />
    );
}
