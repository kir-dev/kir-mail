import { ResponsiveLine, Serie } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { isSameHour, startOfHour, subHours } from 'date-fns';
import { useMemo } from 'react';

import { formatHu } from '../../utils/date';
interface ChartProps {
  completed: number[];
  failed: number[];
}

export function Chart({ completed, failed }: ChartProps) {
  const lineData = useMemo<Serie[]>(() => {
    const completedData = getSerieDataFromTimestamps(completed);
    const failedData = getSerieDataFromTimestamps(failed);

    return [
      {
        id: 'completed',
        data: completedData,
      },
      {
        id: 'failed',
        data: failedData,
      },
    ];
  }, [completed, failed]);

  const pieData = useMemo(() => {
    const completedCount = completed.length;
    const failedCount = failed.length;

    return [
      {
        id: 'completed',
        label: 'Teljesített',
        value: completedCount,
        color: '#86efac',
      },
      {
        id: 'failed',
        label: 'Sikertelen',
        value: failedCount,
        color: '#fca5a5',
      },
    ];
  }, [completed, failed]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='w-full h-80 bg-white rounded-md shadow-sm'>
        <ResponsiveLine
          data={lineData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          yFormat=' >-.2f'
          curve='monotoneX'
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
          }}
          axisLeft={null}
          enableGridX={false}
          enableGridY={false}
          colors={(serie) => (serie.id === 'completed' ? '#86efac' : '#fca5a5')}
          lineWidth={4}
          enablePoints={false}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel='data.yFormatted'
          enableTouchCrosshair
          useMesh
          motionConfig='default'
          tooltip={({ point }) => (
            <div className='bg-white p-2 rounded-md shadow-md'>
              <div className='text-sm font-semibold text-gray-800 capitalize'>{point.serieId}</div>
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
              <div className='text-sm font-semibold text-gray-800 capitalize'>{datum.label}</div>
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
