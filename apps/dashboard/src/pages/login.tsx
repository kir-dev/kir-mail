import { useAuth } from '../components/auth-context';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Login = () => {
  const auth = useAuth();

  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-accent to-background p-4'>
      <Card className='w-full max-w-md animate-fade-in'>
        <CardHeader className='space-y-2 text-center'>
          <img src='/icon.png' alt='Kir-Mail' className='w-12 h-12 mx-auto' />
          <CardTitle className='text-2xl'>Kir-Mail</CardTitle>
          <CardDescription>
            A központi irányítópult a Kir-Mail szolgáltatás monitorozásához és kezeléséhez.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center'>
          <Button size='lg' onClick={auth.login} className='w-full'>
            Bejelentkezés AuthSch-val
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
