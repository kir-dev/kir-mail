import { TokenDto } from '@kir-mail/api-generated';

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { TokenRow } from './token-row';
interface TokensTableProps {
  tokens: TokenDto[];
}

export const TokensTable = ({ tokens }: TokensTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Tokenek</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Név</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Létrehozva</TableHead>
                <TableHead>Használat</TableHead>
                <TableHead className='text-right'>Műveletek</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token) => (
                <TokenRow key={token.id} token={token} />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
