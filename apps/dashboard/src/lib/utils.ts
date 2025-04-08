import { AnalyticsDataStatusEnum } from '@kir-mail/api-generated';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const StatusStyles: Record<AnalyticsDataStatusEnum, { color: string; className: string; label: string }> = {
  [AnalyticsDataStatusEnum.Failed]: {
    color: '#EF4444',
    className: 'status-badge-error',
    label: 'Sikertelen',
  },
  [AnalyticsDataStatusEnum.Completed]: {
    color: '#10B981',
    className: 'status-badge-success',
    label: 'Sikeres',
  },
  [AnalyticsDataStatusEnum.Active]: {
    color: '#3B82F6',
    className: 'status-badge-active',
    label: 'Aktív',
  },
  [AnalyticsDataStatusEnum.Waiting]: {
    color: '#F59E0B',
    className: 'status-badge-warning',
    label: 'Várakozik',
  },
  [AnalyticsDataStatusEnum.Delayed]: {
    color: '#F59E0B',
    className: 'status-badge-warning',
    label: 'Később',
  },
  [AnalyticsDataStatusEnum.WaitingChildren]: {
    color: '#F59E0B',
    className: 'status-badge-warning',
    label: 'Várakozik',
  },
  [AnalyticsDataStatusEnum.Prioritized]: {
    color: '#F59E0B',
    className: 'status-badge-warning',
    label: 'Prioritás',
  },
  [AnalyticsDataStatusEnum.Paused]: {
    color: '#F59E0B',
    className: 'status-badge-warning',
    label: 'Szüneteltetve',
  },
  [AnalyticsDataStatusEnum.Repeat]: {
    color: '#F59E0B',
    className: 'status-badge-warning',
    label: 'Ismétlődik',
  },
  [AnalyticsDataStatusEnum.Wait]: {
    color: '#F59E0B',
    className: 'status-badge-warning',
    label: 'Várakozik',
  },
};
