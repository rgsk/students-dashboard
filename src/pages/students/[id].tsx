import { useRouter } from 'next/router';

import StudentAttendancePage from 'components/StudentsPage/Pages/StudentAttendancePage';

interface IStudentAttendanceRouteProps {}
const StudentAttendanceRoute: React.FC<IStudentAttendanceRouteProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  return id ? <StudentAttendancePage id={+id} /> : null;
};
export default StudentAttendanceRoute;
