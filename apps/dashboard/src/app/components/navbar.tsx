import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

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
        <h1>Kir-Mail Dashboard</h1>
      </div>
    </header>
  );
}
