import { useMe } from '../../hooks/use-me';
import { useAuth } from './auth-context';
import { Button } from './button';

export function Authenticator() {
  const { logout } = useAuth();
  const me = useMe();

  return (
    <div className='flex items-center gap-2'>
      <p>{me.data?.displayName}</p>
      <Button variant='outline' onClick={logout}>
        Kijelentkezés
      </Button>
    </div>
  );
}
