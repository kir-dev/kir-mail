import { Fragment, useEffect, useState } from 'react';
import { TbMenu, TbX } from 'react-icons/tb';
import { Link } from 'react-router-dom';

import { cn } from '../../utils/cn';
import { Authenticator } from './authenticator';
import { Button } from './button';

const navItems = [
  {
    name: 'API Dokumentáció',
    href: `${import.meta.env.VITE_BACKEND_URL}/api`,
  },
  {
    name: 'Tokenek',
    href: '/token',
  },
];

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
      className={cn('sticky top-0 z-10 transition-colors', {
        'border-b bg-white shadow-sm': !onTop,
      })}
    >
      <div className='flex justify-between items-center container mx-auto p-5'>
        <Link to='/' className='flex items-center gap-2'>
          <img src='/icon.png' alt='Kir-Mail' className='w-10 mx-auto' />
          <h1 className='hidden md:block'>Kir-Mail</h1>
        </Link>
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}

function DesktopNav() {
  return (
    <nav className='hidden md:flex gap-5'>
      {navItems.map((item) => (
        <Button key={item.name} variant='link' asChild className='p-0'>
          <Link to={item.href}>{item.name}</Link>
        </Button>
      ))}
    </nav>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (open && (e.target as HTMLElement).closest('.navlink')) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [open]);
  return (
    <div className='md:hidden'>
      <Button onClick={() => setOpen((prev) => !prev)} variant='ghost'>
        {open ? <TbX size={20} /> : <TbMenu size={20} />}
      </Button>
      {open && (
        <div id='mobile-nav' className='absolute top-20 right-0 left-0 bg-white shadow-md rounded-md p-5 mx-5'>
          <nav className='flex flex-col gap-2'>
            {navItems.map((item) => (
              <Fragment key={item.name}>
                <Button variant='ghost' asChild>
                  <Link className='navlink' to={item.href}>
                    {item.name}
                  </Link>
                </Button>
                <hr className='my-2 rounded-full' />
              </Fragment>
            ))}
          </nav>
          <Authenticator />
        </div>
      )}
    </div>
  );
}
