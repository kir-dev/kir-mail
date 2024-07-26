import { TokenDto } from '@kir-mail/api-generated';
import { useQueryClient } from '@tanstack/react-query';
import { TbTrashX } from 'react-icons/tb';

import { useDeleteToken } from '../../hooks/use-delete-token';
import { Button } from './button';
import { DataTable } from './data-table';
import { QuotaDisplay } from './quota-display';
import { SecretDisplay } from './secret-display';

interface TokensDataTableProps {
  data: TokenDto[];
}

export function TokensDataTable({ data }: TokensDataTableProps) {
  return (
    <DataTable
      columns={[
        {
          accessorKey: 'name',
          header: 'Név',
        },
        {
          accessorKey: 'value',
          header: 'Token',
          cell: ({ row }) => <SecretDisplay secret={row.original.value} />,
        },
        {
          header: 'Kvóta',
          cell: ({ row }) => <QuotaDisplay token={row.original} />,
        },
        {
          header: 'Műveletek',
          cell: ({ row }) => <DeleteToken id={row.original.id} />,
        },
      ]}
      data={data}
    />
  );
}

function DeleteToken({ id }: { id: string }) {
  const deleteToken = useDeleteToken();
  const queryClient = useQueryClient();

  const onDelete = () => {
    deleteToken.mutateAsync(id).then(() => queryClient.invalidateQueries({ queryKey: ['tokens'] }));
  };
  return (
    <Button isLoading={deleteToken.isPending} onClick={onDelete} variant='destructiveOutline'>
      <TbTrashX />
    </Button>
  );
}
