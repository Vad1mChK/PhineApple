// src/components/DayCalendar.tsx
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { parseDate, formatDate } from "../utils/dateUtils.ts";

interface Props {
    selected: string;
    onChange: (next: string) => void;
}

export default function DayCalendar({ selected, onChange }: Props) {
    return (
        <DatePicker
            label="Pick a day"
            value={parseDate(selected)}
            onChange={(val: Date | null) => {
                if (val) {
                    onChange(formatDate(val));
                }
            }}
            slots={{ textField: TextField }}
            slotProps={{ textField: { fullWidth: true, sx: { my: 2 } } }}
            enableAccessibleFieldDOMStructure={false}
        />
    );
}
