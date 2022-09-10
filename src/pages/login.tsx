import Layout from 'components/Global/Layout';
import LoginPage from 'components/LoginPage/LoginPage';
import { NextPage } from 'next';

const NextLoginPage: NextPage & { PageLayout: typeof Layout } = ({}) => {
  return <LoginPage />;
};
NextLoginPage.PageLayout = Layout;
export default NextLoginPage;
