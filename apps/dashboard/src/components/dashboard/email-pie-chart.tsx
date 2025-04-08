import { TimestampsDto } from '@kir-mail/api-generated';
import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { cn, StatusStyles } from '../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface EmailPieChartProps {
  title: string;
  data: TimestampsDto;
}

export function EmailPieChart({ title, data }: EmailPieChartProps) {
  const chartData = useMemo(() => {
    return Object.entries(data).map(([key, value]) => ({
      name: key,
      value: value.length,
      type: key,
    }));
  }, [data]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='h-[300px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={chartData}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey='value'
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className={cn('text-xs font-medium fill-muted')}
                  style={{
                    fill: StatusStyles[entry.type].color,
                  }}
                  color={StatusStyles[entry.type].color}
                  name={StatusStyles[entry.type].label}
                  stroke={StatusStyles[entry.type].color}
                  fill={StatusStyles[entry.type].color}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const { value, name, type } = payload[0].payload;
                  const color = StatusStyles[type].color;
                  return (
                    <div className='bg-card p-2 border border-border rounded-md'>
                      <p className='text-sm font-medium' style={{ color }}>
                        {name}: {value}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
