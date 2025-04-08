import { ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

interface EmailStatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
}

export function EmailStatsCard({ title, value, icon, description }: EmailStatsCardProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>{title}</CardTitle>
        <div className='h-4 w-4 text-muted-foreground'>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        {description && <p className='text-xs text-muted-foreground mt-1'>{description}</p>}
      </CardContent>
    </Card>
  );
}
