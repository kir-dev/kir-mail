import { DashboardLayout } from '../components/layout/dashboard-layout';
import { CreateTokenForm } from '../components/tokens/create-token-form';
import { TokensTable } from '../components/tokens/tokens-table';
import { useTokens } from '../hooks/use-tokens';

const Tokens = () => {
  const tokens = useTokens();

  return (
    <DashboardLayout>
      <div className='grid grid-cols-1 gap-6'>
        <div className='space-y-2'>
          <h1 className='text-2xl font-bold'>API Tokenek</h1>
          <p className='text-sm text-muted-foreground'>
            A tokenekkel biztosíthatod a Kir-Mail API-jának használatát az alkalmazásodban. Használd az Authorization
            headerben &apos;Api-Key token&apos; formában, ahol &apos;token&apos; a tokened értéke.
          </p>
        </div>
        <CreateTokenForm />
        <TokensTable tokens={tokens.data ?? []} />
      </div>
    </DashboardLayout>
  );
};

export default Tokens;
