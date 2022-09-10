import AuthGuard from 'components/Global/AuthGuard';
import StudentsPage from 'components/StudentsPage/StudentsPage';
import { NextPage } from 'next';

const NextStudentsPage: NextPage = ({}) => {
  return (
    <AuthGuard>
      <StudentsPage />
    </AuthGuard>
  );
};
export default NextStudentsPage;
