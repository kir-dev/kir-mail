import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '../../utils/cn';
import { Authenticator } from './authenticator';
import { Button } from './button';

export function Header() {
  const [onTop, setOnTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setOnTop(false);
      } else {
        setOnTop(true);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn('sticky top-0 z-10 transition-colors p-5', {
        'border-b bg-white shadow-sm dark:bg-slate-900 dark:shadow-slate-950 dark:border-0': !onTop,
      })}
    >
      <div className='flex justify-between items-center container mx-auto'>
        <Link to='/'>
          <h1>Kir-Mail</h1>
        </Link>
        <div className='flex items-center gap-5'>
          <Button variant='link' asChild className='p-0'>
            <a href='/token'>Tokenek</a>
          </Button>
          <div className='h-6 w-0.5 rounded-full bg-slate-200' />
          <Authenticator />
        </div>
      </div>
    </header>
  );
}
