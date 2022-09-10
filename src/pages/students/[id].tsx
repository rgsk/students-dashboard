import { useRouter } from 'next/router';

import StudentAttendancePage from 'components/StudentsPage/Pages/StudentAttendancePage';
import { NextPage } from 'next';
import AuthGuard from 'components/Global/AuthGuard';
import Layout from 'components/Global/Layout';

const NextStudentAttendancePage: NextPage & {
  PageLayout: typeof Layout;
} = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AuthGuard>{id ? <StudentAttendancePage id={+id} /> : null}</AuthGuard>
  );
};
NextStudentAttendancePage.PageLayout = Layout;
export default NextStudentAttendancePage;
