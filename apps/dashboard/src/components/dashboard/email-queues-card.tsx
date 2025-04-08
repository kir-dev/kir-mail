import { CheckCircle2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface EmailQueuesCardProps {
  queues: string[];
}

export function EmailQueuesCard({ queues }: EmailQueuesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Elérhető üzenetsorok</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex gap-2'>
          {queues.map((queue) => (
            <div key={queue} className='flex items-center justify-between p-3 rounded-md bg-accent'>
              <div className='flex items-center space-x-3'>
                <CheckCircle2 className='h-5 w-5 text-success' />
                <div>
                  <p className='font-medium text-sm'>{queue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
