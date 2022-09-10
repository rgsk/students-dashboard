import AuthGuard from 'components/Global/AuthGuard';
import Layout from 'components/Global/Layout';
import StudentsPage from 'components/StudentsPage/StudentsPage';
import { NextPage } from 'next';

const NextStudentsPage: NextPage & { PageLayout: typeof Layout } = ({}) => {
  return (
    <AuthGuard>
      <StudentsPage />
    </AuthGuard>
  );
};
NextStudentsPage.PageLayout = Layout;
export default NextStudentsPage;
