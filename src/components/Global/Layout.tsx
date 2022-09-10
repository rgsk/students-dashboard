import authApi from 'api/authApi';
import FilledButton from 'components/Shared/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
interface ILayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const router = useRouter();

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
          {router.asPath !== '/login' && (
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
      <main className="px-5">{children}</main>
    </div>
  );
};
export default Layout;
