import { SideNav } from './side-nav';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className='flex min-h-screen'>
      <SideNav />
      <div className='flex-1 md:ml-[250px]'>
        <main className='p-6'>{children}</main>
      </div>
    </div>
  );
}
