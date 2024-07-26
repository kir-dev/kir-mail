import { zodResolver } from '@hookform/resolvers/zod';
import { TokenDto } from '@kir-mail/api-generated';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TbCheck, TbLoader, TbPencilPlus, TbX } from 'react-icons/tb';
import { z } from 'zod';

import { useUpdateTokenQuota } from '../../hooks/use-update-token-quota';
import { cn } from '../../utils/cn';
import { Button } from './button';
import { Input } from './input';

interface QuotaDisplayProps {
  token: TokenDto;
}

const QuotaFormSchema = z.object({
  quota: z
    .string()
    .refine((v) => !isNaN(Number(v)), { message: 'Invalid number' })
    .transform((v) => Number(v)),
});

export function QuotaDisplay({ token }: QuotaDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);

  const updateTokenQuota = useUpdateTokenQuota(token.id);

  const form = useForm<z.infer<typeof QuotaFormSchema>>({
    resolver: zodResolver(QuotaFormSchema),
    defaultValues: { quota: token.quota },
  });

  const onReset = () => {
    form.reset({ quota: token.quota });
    setIsEditing(false);
  };

  const onSubmit = form.handleSubmit(async (data) => {
    await updateTokenQuota.mutateAsync(data.quota);
    setIsEditing(false);
  });

  const barWidth = Math.min((token.used / token.quota) * 100, 100);

  return (
    <div>
      <div className='bg-slate-100 rounded-full w-80 h-2 overflow-hidden'>
        <div
          className={cn('bg-blue-500 h-full', {
            'bg-red-500': barWidth > 90,
          })}
          style={{
            width: `${barWidth}%`,
          }}
        />
      </div>
      {isEditing ? (
        <form onSubmit={onSubmit} className='flex items-center mt-2 gap-1'>
          <Input type='number' className='w-24 px-1 h-5' {...form.register('quota')} />
          <Button variant='ghost' size='inline' type='submit'>
            <TbCheck size={15} />
          </Button>
          <Button variant='ghost' size='inline' onClick={onReset}>
            <TbX size={15} />
          </Button>
        </form>
      ) : (
        <Button variant='ghost' size='inline' className='mt-1' onClick={() => setIsEditing(true)}>
          {token.used} / {token.quota} <TbPencilPlus size={15} className='inline' />{' '}
          {updateTokenQuota.isPending && <TbLoader className='animate-spin' />}
        </Button>
      )}
    </div>
  );
}
