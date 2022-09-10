import { useRouter } from 'next/router';

import StudentAttendancePage from 'components/StudentsPage/Pages/StudentAttendancePage';
import { NextPage } from 'next';
import AuthGuard from 'components/Global/AuthGuard';

const NextStudentAttendancePage: NextPage = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AuthGuard>{id ? <StudentAttendancePage id={+id} /> : null}</AuthGuard>
  );
};
export default NextStudentAttendancePage;
