import AuthGuard from 'components/Global/AuthGuard';
import Layout from 'components/Global/Layout/Layout';
import StudentAttendancePage from 'components/StudentsPage/Pages/StudentAttendancePage/StudentAttendancePage';
import { NextPage } from 'next';

const NextMarkAttendancePage: NextPage & {
  PageLayout: typeof Layout;
} = ({}) => {
  return (
    <AuthGuard>
      <StudentAttendancePage />
    </AuthGuard>
  );
};
NextMarkAttendancePage.PageLayout = Layout;
export default NextMarkAttendancePage;
