import { TbPlus } from 'react-icons/tb';

import { useTokens } from '../../../hooks/use-tokens';
import { LinkButton } from '../../components/button';
import { TokensDataTable } from '../../components/tokens-data-table';

export function TokensList() {
  const tokens = useTokens();
  return (
    <main className='space-y-5'>
      <div className='flex items-center justify-between'>
        <h2>Tokenek</h2>
        <LinkButton href='/token/new'>
          <TbPlus /> Új token
        </LinkButton>
      </div>
      <TokensDataTable data={tokens.data ?? []} />
    </main>
  );
}
