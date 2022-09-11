import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface INavLinkProps {
  href: string;
  children: string;
}
const NavLink: React.FC<INavLinkProps> = ({ href, children }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <span
        className={classNames('cursor-pointer', {
          'underline underline-offset-8': router.asPath === href,
        })}
      >
        {children}
      </span>
    </Link>
  );
};
export default NavLink;
