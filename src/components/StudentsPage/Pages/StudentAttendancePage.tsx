import { useEffect, useMemo, useState } from 'react';

import queryStudents from '../localUtils/queryStudents';
import { format } from 'date-fns';
import RadioInput from './Children/RadioInput';
import { TAttendanceStatus } from 'types/generalTypes';
import useAttendancesTable from 'hooks/useAttendancesTable';
interface IStudentAttendancePageProps {
  id: number;
}
const StudentAttendancePage: React.FC<IStudentAttendancePageProps> = ({
  id,
}) => {
  const student = useMemo(() => {
    return queryStudents.getStudentById(id);
  }, [id]);
  const [attendanceDate, setAttendanceDate] = useState(() => {
    return format(new Date(), 'yyyy-MM-dd');
  });
  const [attendanceStatus, setAttendanceStatus] = useState<TAttendanceStatus>();
  const { markAttendance } = useAttendancesTable();
  useEffect(() => {
    if (attendanceStatus) {
      markAttendance({
        studentId: student.id,
        date: attendanceDate,
        status: attendanceStatus,
      });
    }
  }, [attendanceDate, attendanceStatus, markAttendance, student.id]);
  return (
    <div className="px-5 pt-4">
      {JSON.stringify(student)}
      <div>
        <div>
          <label htmlFor="attendance-date" className="my-label">
            Date:
          </label>
          <input
            type="date"
            className="my-input"
            id="attendance-date"
            value={attendanceDate}
            onChange={(e) => {
              setAttendanceDate(e.target.value);
            }}
          />
        </div>
        <div>
          <RadioInput
            items={[
              {
                value: 'present',
                label: 'Present',
              },
              {
                value: 'absent',
                label: 'Absent',
              },
            ]}
            name="attendance"
            setValue={(v) => setAttendanceStatus(v as TAttendanceStatus)}
            value={attendanceStatus}
          />
        </div>
      </div>
    </div>
  );
};
export default StudentAttendancePage;
