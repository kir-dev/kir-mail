import { AnalyticsData } from '@kir-mail/api-generated';

import { StatusStyles } from '../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export type EmailStatus = 'sent' | 'delivered' | 'failed' | 'bounced' | 'queued';

interface EmailsTableProps {
  emails: AnalyticsData[];
}

export function EmailsTable({ emails }: EmailsTableProps) {
  return (
    <Card className='col-span-3'>
      <CardHeader>
        <CardTitle>Legutóbbi e-mailek</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-40'>Dátum</TableHead>
                <TableHead>Küldő</TableHead>
                <TableHead>Címzett</TableHead>
                <TableHead>Tárgy</TableHead>
                <TableHead>Üzenetsor</TableHead>
                <TableHead>Feldolgozta</TableHead>
                <TableHead className='text-right'>Státusz</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.map((email) => (
                <TableRow key={email.id}>
                  <TableCell className='font-medium'>{new Date(email.timestamp).toLocaleString('hu-HU')}</TableCell>
                  <TableCell>
                    {email.data.from?.name} {email.data.from?.email ? `(${email.data.from.email})` : ''}
                  </TableCell>
                  <TableCell>{email.data.to}</TableCell>
                  <TableCell className='max-w-[180px] truncate'>{email.data?.subject} </TableCell>
                  <TableCell>{email.queue}</TableCell>
                  <TableCell>{email.processedBy}</TableCell>
                  <TableCell className='text-right capitalize'>
                    <span className={StatusStyles[email.status].className}>{StatusStyles[email.status].label}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
