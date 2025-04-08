import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const isDark = localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark');
  const [isDarkState, setIsDarkState] = useState(isDark);

  useEffect(() => {
    if (isDarkState) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkState]);

  const toggleTheme = () => {
    setIsDarkState((prev) => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      className='flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors'
    >
      {isDark ? <Sun className='mr-2 h-4 w-4' /> : <Moon className='mr-2 h-4 w-4' />}
      {isDark ? 'Világos mód' : 'Sötét mód'}
    </button>
  );
}
