import Link from 'next/link';

interface IHomePageProps {}
const HomePage: React.FC<IHomePageProps> = ({}) => {
  return (
    <div>
      <Link href="/students">students</Link>
      <div>
        <Link href="/attendances">attendances</Link>
      </div>
    </div>
  );
};
export default HomePage;
