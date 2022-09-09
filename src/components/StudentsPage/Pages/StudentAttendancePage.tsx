import { useMemo } from 'react';

import queryStudents from '../localUtils/queryStudents';

interface IStudentAttendancePageProps {
  id: number;
}
const StudentAttendancePage: React.FC<IStudentAttendancePageProps> = ({
  id,
}) => {
  const student = useMemo(() => {
    return queryStudents.getStudentById(id);
  }, [id]);
  return <div>{JSON.stringify(student)}</div>;
};
export default StudentAttendancePage;
