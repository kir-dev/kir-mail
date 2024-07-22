import { AnalyticsData, AnalyticsDto } from '@kir-mail/api-generated';
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
          header: 'Date',
          cell: ({ row }) => <span>{new Date(row.original.timestamp).toLocaleDateString()}</span>,
        },
        {
          accessorKey: 'data.from',
          header: 'From',
        },
        {
          accessorKey: 'data.to',
          header: 'To',
        },
        {
          accessorKey: 'data.subject',
          header: 'Subject',
        },
        { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
      ]}
      data={data}
    />
  );
}
