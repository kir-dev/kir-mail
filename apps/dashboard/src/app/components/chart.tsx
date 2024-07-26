import { TimestampsDto } from '@kir-mail/api-generated';
import { ResponsiveLine, Serie } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { JobType } from 'bullmq';
import { isSameHour, startOfHour, subHours } from 'date-fns';
import { useMemo } from 'react';

import { formatHu } from '../../utils/date';
interface ChartProps {
  data: TimestampsDto;
}

export function Chart({ data }: ChartProps) {
  const lineData = useMemo<Serie[]>(() => {
    return Object.entries(data).map(([id, data]) => ({
      id,
      data: getSerieDataFromTimestamps(data),
    }));
  }, [data]);

  const pieData = useMemo(() => {
    return Object.entries(data)
      .map(([id, data]) => ({
        id,
        label: JobTypeChartMap[id as JobType].label,
        value: data.length,
        color: JobTypeChartMap[id as JobType].color,
      }))
      .filter((d) => d.value > 0);
  }, [data]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='w-full h-80 bg-white rounded-md shadow-sm'>
        <ResponsiveLine
          data={lineData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 0,
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          curve='monotoneX'
          axisTop={null}
          axisRight={null}
          axisLeft={null}
          enableGridX={false}
          enableGridY={false}
          colors={(serie) => JobTypeChartMap[serie.id as JobType].color}
          lineWidth={4}
          enablePoints={false}
          enableTouchCrosshair
          useMesh
          motionConfig='default'
          tooltip={({ point }) => (
            <div className='bg-white p-2 rounded-md shadow-md'>
              <div className='text-sm font-semibold text-gray-800 capitalize'>
                {JobTypeChartMap[point.serieId as JobType].label}
              </div>
              <div className='text-xs text-gray-600'>
                {point.data.xFormatted} - {point.data.yFormatted}
              </div>
            </div>
          )}
        />
      </div>
      <div className='w-full h-80 bg-white rounded-md shadow-sm'>
        <ResponsivePie
          data={pieData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={5}
          activeOuterRadiusOffset={8}
          colors={(d) => d.data.color}
          enableArcLinkLabels={false}
          motionConfig='wobbly'
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
          tooltip={({ datum }) => (
            <div className='bg-white p-2 rounded-md shadow-md'>
              <div className='text-sm font-semibold text-gray-800 capitalize'>
                {JobTypeChartMap[datum.id as JobType].label}
              </div>
              <div className='text-xs text-gray-600'>{datum.value}</div>
            </div>
          )}
        />
      </div>
    </div>
  );
}

function getSerieDataFromTimestamps(timestamps: number[]) {
  return [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((i) => {
    const date = startOfHour(subHours(new Date(), i));
    const value = timestamps.filter((ts) => isSameHour(ts, date)).length;
    return { x: formatHu(date, 'HH:mm'), y: value };
  });
}

const JobTypeChartMap: Record<JobType, { label: string; color: string }> = {
  active: { label: 'Aktív', color: '#93c5fd' },
  completed: { label: 'Kész', color: '#86efac' },
  failed: { label: 'Sikertelen', color: '#fca5a5' },
  prioritized: { label: 'Priorizált', color: '#d8b4fe' },
  repeat: { label: 'Ismételt', color: '#fde047' },
  delayed: { label: 'Késleltetett', color: '#fde047' },
  paused: { label: 'Szüneteltetve', color: '#cbd5e1' },
  'waiting-children': { label: 'Alfeladatra vár', color: '#cbd5e1' },
  wait: { label: 'Várakozás', color: '#cbd5e1' },
  waiting: { label: 'Várakozik', color: '#cbd5e1' },
};
