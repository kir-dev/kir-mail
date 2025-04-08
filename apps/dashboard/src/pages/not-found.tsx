import { useNavigate } from 'react-router-dom';

import { Button } from '../components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4'>
      <h1 className='text-6xl font-bold text-primary mb-4'>404</h1>
      <p className='text-xl text-muted-foreground mb-6'>The page you're looking for doesn't exist.</p>
      <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
    </div>
  );
};

export default NotFound;
