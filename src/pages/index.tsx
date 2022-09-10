import AuthGuard from 'components/Global/AuthGuard';
import HomePage from 'components/HomePage/HomePage';
import { NextPage } from 'next';

const NextHomePage: NextPage = ({}) => {
  return (
    <AuthGuard>
      <HomePage />
    </AuthGuard>
  );
};
export default NextHomePage;
