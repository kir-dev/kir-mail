import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './components/auth-context';
import { Toaster as Sonner } from './components/ui/sonner';
import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import Dashboard from './pages/dashboard';
import NotFound from './pages/not-found';
import Tokens from './pages/tokens';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/tokens' element={<Tokens />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
