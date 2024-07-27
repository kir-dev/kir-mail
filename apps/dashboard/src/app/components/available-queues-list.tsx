interface AvailableQueuesListProps {
  queues: string[];
}

export function AvailableQueuesList({ queues }: AvailableQueuesListProps) {
  return (
    <div className='p-5 bg-white rounded-md shadow-sm space-y-2'>
      <h2>Elérhető üzenetsorok</h2>
      <ul className='flex gap-1 flex-wrap'>
        {queues.map((queue) => (
          <li className={'px-2 py-1 rounded-full bg-slate-100'} key={queue}>
            {queue}
          </li>
        ))}
      </ul>
    </div>
  );
}
