import authApi from 'api/authApi';
import FilledButton from 'components/Shared/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
interface ILayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const router = useRouter();
  // since authApi uses window object, so on server side render it was causing problem
  const isLoggedIn = typeof window !== 'undefined' && authApi.isLoggedIn();

  return (
    <div>
      <header className="flex justify-between items-center py-5 px-5">
        <div
          className="bg-white cursor-pointer"
          onClick={() => {
            router.push('/');
          }}
        >
          <Image src="/pw-logo.png" alt="pw-logo" width={50} height={50} />
        </div>
        <div>
          {isLoggedIn && (
            <FilledButton
              onClick={() => {
                authApi.logout();
                router.push('/login');
              }}
            >
              Logout
            </FilledButton>
          )}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
export default Layout;
