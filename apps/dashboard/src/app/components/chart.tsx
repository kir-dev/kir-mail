import { ResponsiveLine, Serie } from '@nivo/line';
import { isSameHour, startOfHour, subHours } from 'date-fns';
import { useMemo } from 'react';
import { formatHu } from '../../utils/date';
interface ChartProps {
  completed: number[];
  failed: number[];
}

export function Chart({ completed, failed }: ChartProps) {
  const data = useMemo<Serie[]>(() => {
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

  return (
    <div className='w-full h-80 bg-white rounded-md shadow-sm'>
      <ResponsiveLine
        data={data}
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
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: 'middle',
          truncateTickAt: 0,
          tickValues: 5,
        }}
        enableGridX={false}
        enableGridY={false}
        colors={(serie) => (serie.id === 'completed' ? '#22c55e' : '#ef4444')}
        lineWidth={4}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel='data.yFormatted'
        pointLabelYOffset={-12}
        crosshairType='x'
        enableTouchCrosshair
        useMesh
        legends={[]}
        motionConfig='default'
      />
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
