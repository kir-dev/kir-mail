import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useCreateToken } from '../../hooks/use-create-token';

export function CreateTokenForm() {
  const createToken = useCreateToken();
  const [name, setName] = useState('');
  const [quota, setQuota] = useState(1000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Kérlek adj meg egy token nevet');
      return;
    }

    if (quota <= 0) {
      toast.error('A kvóta nem lehet 0-nál kisebb');
      return;
    }

    createToken.mutate({ name, quota });
    setName('');
    setQuota(1000);
    toast.success('Token sikeresen létrehozva');
  };

  const disabled = createToken.isPending || !name.trim() || quota <= 0;

  return (
    <Card className='max-w-lg'>
      <CardHeader>
        <CardTitle>Új API Token létrehozása</CardTitle>
        <CardDescription>Létrehozhatsz egy új API tokenet a Kir-Mail API-jának használatához.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id='create-token-form'>
          <div className='grid gap-6'>
            <div className='grid gap-3'>
              <Label htmlFor='name'>Token neve</Label>
              <Input
                id='name'
                placeholder='e.g. Production API'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='quota'>Havi kvóta</Label>
              <Input
                id='quota'
                type='number'
                min='1'
                value={quota}
                onChange={(e) => setQuota(parseInt(e.target.value, 10) || 0)}
              />
              <p className='text-sm text-muted-foreground'>A tokennal elküldhető e-mailek maximális száma havonta.</p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type='submit' form='create-token-form' disabled={disabled}>
          {createToken.isPending ? 'Token létrehozása...' : 'Token létrehozása'}
        </Button>
      </CardFooter>
    </Card>
  );
}
