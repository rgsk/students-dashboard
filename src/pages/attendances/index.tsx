import AuthGuard from 'components/Global/AuthGuard';
import Layout from 'components/Global/Layout';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

// data getting populated by localStorage was
// leading to rendering different stuff on server and client side
// we did this to prevent error raised by nextjs
const AttendancesPage = dynamic(
  () => import('components/AttendancesPage/AttendancesPage'),
  {
    ssr: false,
  }
);
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
