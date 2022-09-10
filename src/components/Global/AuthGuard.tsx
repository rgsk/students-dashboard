import authApi from 'api/authApi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface IAuthGuardProps {
  children: React.ReactNode;
}
const AuthGuard: React.FC<IAuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const [checkingLoggedIn, setCheckingLoggedIn] = useState(true);
  useEffect(() => {
    const loggedIn = authApi.isLoggedIn();
    if (!loggedIn) {
      router.push('/login');
    } else {
      setCheckingLoggedIn(false);
    }
  }, [router]);

  return <div>{checkingLoggedIn ? null : children}</div>;
};
export default AuthGuard;
