import { AnalyticsDataStatusEnum, TimestampsDto } from '@kir-mail/api-generated';
import { format, isSameHour, startOfHour, subHours } from 'date-fns';
import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { StatusStyles } from '../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface EmailLineChartProps {
  title: string;
  data: TimestampsDto;
}

export function EmailLineChart({ title, data }: EmailLineChartProps) {
  const chartData = useMemo(() => getChartData(data), [data]);
  return (
    <Card className='lg:col-span-2'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='h-[300px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray='3 3' stroke='#64748b30' />
            <XAxis dataKey='date' tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              width={40}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                color: 'var(--foreground)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              }}
            />
            {[
              AnalyticsDataStatusEnum.Active,
              AnalyticsDataStatusEnum.Waiting,
              AnalyticsDataStatusEnum.Failed,
              AnalyticsDataStatusEnum.Completed,
            ].map((area) => {
              const style = StatusStyles[area];
              return (
                <Area
                  key={area}
                  type='monotone'
                  dataKey={`statuses.${area}`}
                  stroke={style.color}
                  fill={`${style.color}50`}
                  strokeWidth={2}
                  name={style.label}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

type TimeSlot = {
  date: string;
  dateObj: Date;
  statuses: Record<string, number>;
};

function getChartData(data: TimestampsDto) {
  const timeSlots: TimeSlot[] = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((i) => {
    const date = startOfHour(subHours(new Date(), i));
    return {
      date: format(date, 'HH:mm'),
      dateObj: date,
      statuses: Object.fromEntries(Object.values(AnalyticsDataStatusEnum).map((status) => [status, 0])),
    };
  });

  for (const status of Object.values(AnalyticsDataStatusEnum)) {
    const timestamps = data[status];
    if (timestamps) {
      timestamps.forEach((timestamp) => {
        const timestampDate = new Date(timestamp);
        const slot = timeSlots.find((slot) => isSameHour(slot.dateObj, timestampDate));
        if (slot) {
          slot.statuses[status] = (slot.statuses[status] as number) + 1;
        }
      });
    }
  }

  return timeSlots;
}
