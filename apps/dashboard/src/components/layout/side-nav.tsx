import { Book, Home, Key, LogOut, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '../../lib/utils';
import { useAuth } from '../auth-context';
import { ThemeSwitcher } from '../theme-switcher';

const navItems = [
  {
    name: 'Műszerfal',
    href: '/',
    icon: Home,
  },
  {
    name: 'Tokenek',
    href: '/tokens',
    icon: Key,
  },
  {
    name: 'API Dokumentáció',
    href: `${import.meta.env.VITE_BACKEND_URL}/api`,
    icon: Book,
  },
];

export function SideNav() {
  const location = useLocation();
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const toggleButton = document.getElementById('sidebar-toggle');

      if (
        isOpen &&
        sidebar &&
        toggleButton &&
        !sidebar.contains(event.target as Node) &&
        !toggleButton.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        id='sidebar-toggle'
        onClick={() => setIsOpen(!isOpen)}
        className='md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-sidebar text-sidebar-foreground shadow-md'
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && <div className='md:hidden fixed inset-0 bg-black/50 z-30' onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        id='sidebar'
        className={cn(
          'h-screen flex flex-col bg-sidebar border-r border-sidebar-border fixed top-0 left-0 w-[250px] z-40 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className='p-4 flex items-center border-b border-sidebar-border'>
          <img src='/icon.png' alt='Kir-Mail' className='w-6 h-6 mr-2' />
          <h1 className='text-lg font-semibold'>Kir-Mail</h1>
        </div>

        <div className='flex-1 py-6 px-3 space-y-1'>
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className='mr-2 h-4 w-4' />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className='p-4 border-t border-sidebar-border mt-auto space-y-1'>
          <ThemeSwitcher />
          <button
            onClick={() => auth.logout()}
            className='flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors'
          >
            <LogOut className='mr-2 h-4 w-4' />
            Kijelentkezés
          </button>
        </div>
      </div>
    </>
  );
}
