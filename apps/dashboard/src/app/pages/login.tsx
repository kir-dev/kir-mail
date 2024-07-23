import { useAuth } from '../components/auth-context';
import { Button } from '../components/button';

export function LoginPage() {
  const { login } = useAuth();
  return (
    <div className='h-screen flex items-center'>
      <div className='w-fit mx-auto rounded-lg p-10 bg-white space-y-10 text-center'>
        <h1>Welcome to Kir-Mail</h1>
        <p className='max-w-80 text-slate-500'>
          In order to use Kir-Mail, you need to login with your AuthSch account, with an active Kir-Dev membership.
        </p>
        <Button onClick={login}>Login with AuthSch</Button>
      </div>
    </div>
  );
}
