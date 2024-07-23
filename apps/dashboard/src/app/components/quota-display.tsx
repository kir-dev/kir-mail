import { zodResolver } from '@hookform/resolvers/zod';
import { TokenDto } from '@kir-mail/api-generated';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TbCheck, TbPencilPlus, TbX } from 'react-icons/tb';
import { z } from 'zod';

import { useUpdateTokenQuota } from '../../hooks/use-update-token-quota';
import { cn } from '../../utils/cn';
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

  const queryClient = useQueryClient();
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
    queryClient.invalidateQueries({ queryKey: ['tokens'] });
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
          <button type='submit' className='hover:bg-slate-200 rounded-full cursor-pointer p-1'>
            <TbCheck size={15} />
          </button>
          <button className='hover:bg-slate-200 rounded-full cursor-pointer p-1' onClick={onReset}>
            <TbX size={15} />
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className='mt-2 hover:bg-slate-200 rounded-full cursor-pointer py-0.5 px-2'
        >
          {token.used} / {token.quota} <TbPencilPlus size={15} className='inline' />
        </button>
      )}
    </div>
  );
}
