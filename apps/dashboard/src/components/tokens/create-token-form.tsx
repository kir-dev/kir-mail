import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { useCreateToken } from '../../hooks/use-create-token';
import { Label } from '../ui/label';

const formSchema = z.object({
  name: z
    .string({ required_error: 'Kérlek adj meg egy token nevet' })
    .min(1, { message: 'Kérlek adj meg egy token nevet' }),
  quota: z.coerce
    .number({ required_error: 'Kérlek adj meg egy kvótát' })
    .min(1, { message: 'A kvóta nem lehet 0-nál kisebb' }),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateTokenForm() {
  const createToken = useCreateToken();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      quota: 1000,
    },
  });

  const onSubmit = (values: FormValues) => {
    createToken.mutate(
      {
        name: values.name,
        quota: values.quota,
      },
      {
        onSuccess: () => {
          form.reset({
            name: '',
            quota: 1000,
          });
          toast.success('Token sikeresen létrehozva');
        },
      }
    );
  };

  return (
    <Card className='max-w-lg'>
      <CardHeader>
        <CardTitle>Új API Token létrehozása</CardTitle>
        <CardDescription>Létrehozhatsz egy új API tokenet a Kir-Mail API-jának használatához.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} id='create-token-form' className='grid gap-6'>
          <div>
            <Label htmlFor='name'>Token neve</Label>
            <Input {...form.register('name')} placeholder='e.g. Production API' className='w-full' id='name' />
            {form.formState.errors.name && <p className='text-sm text-red-500'>{form.formState.errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor='quota'>Havi kvóta</Label>
            <Input {...form.register('quota')} type='number' min='1' className='w-full' id='quota' />
            {form.formState.errors.quota && (
              <p className='text-sm text-red-500'>{form.formState.errors.quota.message}</p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type='submit' form='create-token-form' isLoading={createToken.isPending}>
          Token létrehozása
        </Button>
      </CardFooter>
    </Card>
  );
}
