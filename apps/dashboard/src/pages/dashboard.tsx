import { Check, Loader2, Send, X } from 'lucide-react';

import { EmailLineChart } from '../components/dashboard/email-line-chart';
import { EmailPieChart } from '../components/dashboard/email-pie-chart';
import { EmailQueuesCard } from '../components/dashboard/email-queues-card';
import { EmailStatsCard } from '../components/dashboard/email-stats-card';
import { EmailsTable } from '../components/dashboard/emails-table';
import { DashboardLayout } from '../components/layout/dashboard-layout';
import { useAnalyticsData } from '../hooks/use-analytics-data';

export default function Dashboard() {
  const analyticsData = useAnalyticsData();

  if (analyticsData.isLoading) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center h-full'>
          <Loader2 className='w-10 h-10 animate-spin text-primary' />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Műszerfal</h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
        <EmailStatsCard
          title='Összesen'
          value={Object.values(analyticsData.data.timestamps).reduce((acc, curr) => acc + curr.length, 0)}
          icon={<Send />}
          description='küldött email'
        />
        <EmailStatsCard
          title='Sikeres'
          value={analyticsData.data.timestamps.completed.length}
          icon={<Check />}
          description='sikeres email'
        />
        <EmailStatsCard
          title='Sikertelen'
          value={analyticsData.data.timestamps.failed.length}
          icon={<X />}
          description='sikertelen email'
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
        <EmailLineChart title='Aktivitás' data={analyticsData.data.timestamps} />
        <EmailPieChart title='Állapot eloszlás' data={analyticsData.data.timestamps} />
      </div>

      <div className='grid grid-cols-1 gap-6 mb-6'>
        <EmailQueuesCard queues={analyticsData.data.availableQueues} />
        <EmailsTable emails={analyticsData.data.items} />
      </div>
    </DashboardLayout>
  );
}
