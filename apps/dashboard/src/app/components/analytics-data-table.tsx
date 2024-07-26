import { AnalyticsData } from '@kir-mail/api-generated';

import { formatHu } from '../../utils/date';
import { DataTable } from './data-table';
import { StatusBadge } from './status-badge';

interface AnalyticsDataTableProps {
  data: AnalyticsData[];
}

export function AnalyticsDataTable({ data }: AnalyticsDataTableProps) {
  return (
    <DataTable
      columns={[
        {
          accessorKey: 'date',
          header: 'Dátum',
          cell: ({ row }) => <>{formatHu(row.original.timestamp, 'MM. dd. • HH:mm')}</>,
        },
        {
          accessorKey: 'data.from',
          header: 'Küldő',
        },
        {
          accessorKey: 'data.to',
          header: 'Címzett',
        },
        {
          accessorKey: 'data.subject',
          header: 'Tárgy',
        },
        { accessorKey: 'data.processedBy', header: 'Szolgáltatás' },
        { accessorKey: 'status', header: 'Státusz', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
      ]}
      data={data}
    />
  );
}
