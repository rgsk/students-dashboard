import Dummy from 'components/Shared/Dummy';

interface ILoginPageProps {}
const LoginPage: React.FC<ILoginPageProps> = ({}) => {
  return (
    <div>
      <p className="text-red-400">LoginPage</p>
      <Dummy />
    </div>
  );
};
export default LoginPage;
