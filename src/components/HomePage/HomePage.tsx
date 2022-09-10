import FilledButton from 'components/Shared/Button';
import Link from 'next/link';

interface IHomePageProps {}
const HomePage: React.FC<IHomePageProps> = ({}) => {
  return (
    <div className="flex justify-center pt-[100px]">
      <div className="space-y-2 flex flex-col items-center">
        <div>
          <Link href="/students">
            <FilledButton>View Students</FilledButton>
          </Link>
        </div>
        <div>
          <Link href="/attendances">
            <FilledButton>View Attendances</FilledButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
