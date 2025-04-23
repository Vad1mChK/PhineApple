import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { DailySummary } from '../types/habit';

interface Props {
    data: DailySummary[];
}

export default function ProgressChart({ data }: Props) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
                <XAxis dataKey="date" hide />
                <YAxis allowDecimals={false} width={30} />
                <Tooltip />
                <Line type="monotone" dataKey="completedCount" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
}
