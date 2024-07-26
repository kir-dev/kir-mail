import { useMe } from '../../hooks/use-me';
import { useAuth } from './auth-context';
import { Button } from './button';

export function Authenticator() {
  const { authenticated, login, logout } = useAuth();
  const me = useMe();

  if (authenticated) {
    return (
      <div className='flex items-center gap-2'>
        <p>{me.data?.displayName}</p>
        <Button variant='outline' onClick={logout}>
          Kijelentkezés
        </Button>
      </div>
    );
  }

  return (
    <Button variant='outline' onClick={login}>
      Bejelentkezés
    </Button>
  );
}
