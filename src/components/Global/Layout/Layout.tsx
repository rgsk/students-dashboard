import authApi from 'api/authApi';
import FilledButton from 'components/Shared/FilledButton';
import { useRouter } from 'next/router';
import NavLink from './Children/NavLink';
import PWLogo from './Children/PWLogo';
interface ILayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div>
      <header className="flex justify-between items-center py-5 px-5">
        <nav className="flex items-center space-x-10">
          <PWLogo />
          <NavLink href="/students">Students</NavLink>
          <NavLink href="/attendances">Attendances</NavLink>
          <NavLink href="/mark-attendance">Mark Attendace</NavLink>
        </nav>
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
