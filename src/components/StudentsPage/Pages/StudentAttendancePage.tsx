import { useMemo, useState } from 'react';

import RadioInput from './Children/RadioInput';
import { TAttendanceStatus } from 'types/generalTypes';
import useAttendancesTable from 'hooks/useAttendancesTable';
import generalUtils from 'utils/generalUtils';
import studentsApi from 'api/studentsApi';
interface IStudentAttendancePageProps {
  id: number;
}
const StudentAttendancePage: React.FC<IStudentAttendancePageProps> = ({
  id,
}) => {
  const student = useMemo(() => {
    return studentsApi.getStudentById(id);
  }, [id]);
  const [attendanceDate, setAttendanceDate] = useState(() => {
    return generalUtils.getAttendanceDateString(new Date());
  });
  const { markAttendance, getAttendance } = useAttendancesTable();

  const attendanceStatus = useMemo(() => {
    return getAttendance({ studentId: student.id, date: attendanceDate });
  }, [attendanceDate, getAttendance, student.id]);

  return (
    <div className="px-10 pt-4">
      <div>
        <h3 className="text-lg">Student Details</h3>
        <div className="mt-2">
          <p>Id: {student.id}</p>
          <p>Name: {student.firstName + ' ' + student.lastName}</p>
          <p>Email: {student.email}</p>
          <p>Phone: {student.phone}</p>
          <p>Age: {student.age}</p>
          <p>Roll: {student.rollNumber}</p>
          <p>Gender: {student.gender}</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg">Mark Attendance</h3>
        <div className="mt-2">
          <div className="flex items-center space-x-2 w-[200px]">
            <label htmlFor="attendance-date">Date:</label>
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
          <div className="mt-2">
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
    </div>
  );
};
export default StudentAttendancePage;
