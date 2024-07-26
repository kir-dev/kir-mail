import { useEffect, useState } from 'react';
import { TbCheck, TbCopy } from 'react-icons/tb';

import { Button } from './button';

interface SecretDisplayProps {
  secret: string;
}

export function SecretDisplay({ secret }: SecretDisplayProps) {
  const [isCopied, setIsCopied] = useState(false);

  const hiddenString = `${secret.slice(0, 4)}${'•'.repeat(secret.length - 8)}${secret.slice(-4)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(secret).then(() => {
      setIsCopied(true);
    });
  };

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  return (
    <div className='flex items-center space-x-4'>
      <span>{hiddenString}</span>
      <Button variant='ghost' onClick={copyToClipboard}>
        {isCopied ? <TbCheck /> : <TbCopy />}
      </Button>
    </div>
  );
}
