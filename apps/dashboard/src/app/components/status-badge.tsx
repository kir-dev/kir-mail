import { AnalyticsData } from '@kir-mail/api-generated';

import { cn } from '../../utils/cn';

interface StatusBadgeProps {
  status: AnalyticsData['status'];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn('px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 border-slate-500 text-slate-500', {
        'bg-green-100 border-green-500 text-green-500': status === 'completed',
        'bg-red-100 border-red-500 text-red-500': status === 'failed',
        'bg-blue-100 border-blue-500 text-blue-500': status === 'active',
        'bg-purple-100 border-purple-500 text-purple-500': status === 'prioritized',
        'bg-yellow-100 border-yellow-500 text-yellow-500': status === 'delayed' || status === 'repeat',
      })}
    >
      {status}
    </span>
  );
}
