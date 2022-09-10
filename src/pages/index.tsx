import AuthGuard from 'components/Global/AuthGuard';
import Layout from 'components/Global/Layout';
import HomePage from 'components/HomePage/HomePage';
import { NextPage } from 'next';

const NextHomePage: NextPage & { PageLayout: typeof Layout } = ({}) => {
  return (
    <AuthGuard>
      <HomePage />
    </AuthGuard>
  );
};
NextHomePage.PageLayout = Layout;
export default NextHomePage;
