import AttendancesPage from 'components/AttendancesPage/AttendancesPage';
import AuthGuard from 'components/Global/AuthGuard';
import Layout from 'components/Global/Layout/Layout';
import { NextPage } from 'next';

const NextAttendancesPage: NextPage & {
  PageLayout: typeof Layout;
} = ({}) => {
  return (
    <AuthGuard>
      <AttendancesPage />
    </AuthGuard>
  );
};
NextAttendancesPage.PageLayout = Layout;
export default NextAttendancesPage;
