import { useAnalyticsData } from '../../hooks/use-analytics-data';
import { AnalyticsDataTable } from '../components/analytics-data-table';
import { Chart } from '../components/chart';

export function DashboardPage() {
  const analyticsData = useAnalyticsData();

  return (
    <main className='space-y-5'>
      <h2>Dashboard</h2>
      <Chart
        completed={analyticsData.data?.completedTimestamps ?? []}
        failed={analyticsData.data?.failedTimestamps ?? []}
      />
      <AnalyticsDataTable data={analyticsData.data?.items ?? []} />
    </main>
  );
}
