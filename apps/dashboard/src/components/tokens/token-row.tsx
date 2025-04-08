import { TokenDto } from '@kir-mail/api-generated';
import { Progress } from '@radix-ui/react-progress';
import { Copy, Eye, EyeOff, Pencil, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useDeleteToken } from '../../hooks/use-delete-token';
import { useUpdateTokenQuota } from '../../hooks/use-update-token-quota';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { TableCell, TableRow } from '../ui/table';

export interface TokenRowProps {
  token: TokenDto;
}

export function TokenRow({ token }: TokenRowProps) {
  const updateTokenQuota = useUpdateTokenQuota();
  const deleteToken = useDeleteToken();
  const [quota, setQuota] = useState(token.quota);

  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setQuota(token.quota);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token.value);
    toast.success('Token copied to clipboard');
  };

  const saveQuota = async () => {
    await updateTokenQuota.mutateAsync({ id: token.id, quota: quota });
    setIsEditing(false);
  };

  const onDelete = () => {
    deleteToken.mutate(token.id);
  };

  return (
    <TableRow key={token.id}>
      <TableCell className='font-medium'>{token.name}</TableCell>
      <TableCell>
        <div className='flex items-center space-x-2'>
          <span className='font-mono text-xs'>{isVisible ? token.value : '••••••••••••••••••••••••••'}</span>
          <Button variant='ghost' size='icon' onClick={() => toggleVisibility()}>
            {isVisible ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
          </Button>
          <Button variant='ghost' size='icon' onClick={() => copyToClipboard()}>
            <Copy className='h-4 w-4' />
          </Button>
        </div>
      </TableCell>
      <TableCell>{new Date(token.createdAt).toLocaleString('hu-HU')}</TableCell>
      <TableCell className='w-[200px]'>
        <div className='flex flex-col space-y-1'>
          <div className='flex justify-between text-xs'>
            <span className='inline-flex items-center gap-1'>
              {token.used} /{' '}
              {isEditing ? (
                <Input
                  className='w-20 h-fit p-1'
                  value={quota}
                  type='number'
                  onChange={(e) => setQuota(parseInt(e.target.value))}
                />
              ) : (
                token.quota
              )}
              {isEditing ? (
                <SaveButton id={token.id} saveQuota={saveQuota} />
              ) : (
                <EditButton id={token.id} startEditingQuota={toggleEditing} />
              )}
            </span>
          </div>
          <Progress value={(token.used / token.quota) * 100} className='h-2' />
        </div>
      </TableCell>
      <TableCell className='text-right'>
        <Button
          variant='ghost'
          size='icon'
          className='text-error'
          onClick={() => onDelete()}
          isLoading={deleteToken.isPending}
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </TableCell>
    </TableRow>
  );
}

interface EditButtonProps {
  id: string;
  startEditingQuota: (id: string) => void;
}

function EditButton({ id, startEditingQuota }: EditButtonProps) {
  return (
    <Button variant='ghost' size='sm' className='p-2 h-fit w-fit' onClick={() => startEditingQuota(id)}>
      <Pencil className='h-4 w-4' />
    </Button>
  );
}

interface SaveButtonProps {
  id: string;
  saveQuota: (id: string) => void;
}

function SaveButton({ id, saveQuota }: SaveButtonProps) {
  return (
    <Button variant='ghost' size='sm' className='p-2 h-fit w-fit' onClick={() => saveQuota(id)}>
      <Save className='h-4 w-4' />
    </Button>
  );
}
