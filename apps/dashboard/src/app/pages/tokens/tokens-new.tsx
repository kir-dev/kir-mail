import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTokenDto } from '@kir-mail/api-generated';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z, ZodType } from 'zod';

import { useCreateToken } from '../../../hooks/use-create-token';
import { Button } from '../../components/button';
import { TextField } from '../../components/fields';

const TokenFormSchema = z.object({
  name: z.string().min(3).max(255),
  quota: z.coerce.number().int().min(0).max(1000000),
}) satisfies ZodType<CreateTokenDto>;

export function NewToken() {
  const navigate = useNavigate();
  const createToken = useCreateToken();
  const form = useForm<CreateTokenDto>({
    resolver: zodResolver(TokenFormSchema),
    defaultValues: {
      name: '',
      quota: 30000,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    createToken.mutateAsync(data).then(() => {
      navigate('/token');
    });
  });

  return (
    <main>
      <div className='space-y-5 max-w-xl bg-white rounded-lg shadow-md p-5'>
        <h2>Új token</h2>
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className='space-y-5'>
            <TextField
              control={form.control}
              name='name'
              label='Név'
              placeholder='Én nem spammelős alkalmazásom'
              autoComplete='off'
            />
            <TextField control={form.control} name='quota' label='Kvóta' type='number' placeholder='30000' step={100} />
            <Button isLoading={createToken.isPending} type='submit'>
              Létrehozás
            </Button>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
