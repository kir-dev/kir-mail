import { useAuth } from '../components/auth-context';
import { Button } from '../components/button';

export function LoginPage() {
  const { login } = useAuth();
  return (
    <div className='h-screen flex items-center'>
      <div className='w-fit mx-auto rounded-lg p-10 bg-white space-y-10 text-center'>
        <img src='/icon.png' alt='Kir-Mail' className='w-20 mx-auto' />
        <h1>Kir-Mail</h1>
        <p className='text-slate-500 max-w-80'>
          A használathoz be kell jelentkezned AuthSch fiókoddal, amellyel a megfelelő csoportban tagságod van.
        </p>
        <Button onClick={login}>Bejelentkezés</Button>
      </div>
    </div>
  );
}
