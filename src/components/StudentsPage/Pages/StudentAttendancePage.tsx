import { useMemo, useState } from 'react';

import queryStudents from '../localUtils/queryStudents';
import RadioInput from './Children/RadioInput';
import { TAttendanceStatus } from 'types/generalTypes';
import useAttendancesTable from 'hooks/useAttendancesTable';
import generalUtils from 'utils/generalUtils';
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
    return generalUtils.getAttendanceDateString(new Date());
  });
  const { markAttendance, getAttendance } = useAttendancesTable();

  const attendanceStatus = useMemo(() => {
    return getAttendance({ studentId: student.id, date: attendanceDate });
  }, [attendanceDate, getAttendance, student.id]);

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
            setValue={(v) => {
              const status = v as TAttendanceStatus;
              markAttendance({
                studentId: student.id,
                date: attendanceDate,
                status: status,
              });
            }}
            value={attendanceStatus}
          />
        </div>
      </div>
    </div>
  );
};
export default StudentAttendancePage;
