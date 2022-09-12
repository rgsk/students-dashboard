import { useCallback, useEffect, useMemo, useState } from 'react';

import RadioInput from './Children/RadioInput';
import { TAttendanceStatus } from 'types/generalTypes';
import generalUtils from 'utils/generalUtils';

import attendancesApi from 'api/attendancesApi';
import studentsApi from 'api/studentsApi';

interface IStudentAttendancePageProps {
  id?: number;
}
const StudentAttendancePage: React.FC<IStudentAttendancePageProps> = ({
  id,
}) => {
  const [studentId, setStudentId] = useState(id);
  const student = useMemo(() => {
    if (studentId === undefined) return null;
    return studentsApi.getStudentById(studentId);
  }, [studentId]);
  const [attendanceDate, setAttendanceDate] = useState(() => {
    return generalUtils.getAttendanceDateString(new Date());
  });
  const [attendanceStatus, setAttendanceStatus] = useState<TAttendanceStatus>();
  const fetchAndSetAttendanceStatus = useCallback(() => {
    if (!student) return;
    const status = attendancesApi.getAttendance({
      studentId: student.id,
      date: attendanceDate,
    });
    setAttendanceStatus(status);
  }, [attendanceDate, student]);

  useEffect(() => {
    fetchAndSetAttendanceStatus();
  }, [fetchAndSetAttendanceStatus]);

  return (
    <div className="pl-[90px]">
      <div className="flex items-center space-x-2 mb-8">
        <label>StudentId: </label>
        <input
          type="number"
          className="my-input w-[150px]"
          value={studentId}
          onChange={(e) => {
            setStudentId(e.target.value ? Number(e.target.value) : undefined);
          }}
        />
      </div>
      {student ? (
        <>
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
                    attendancesApi.markAttendance({
                      studentId: student.id,
                      date: attendanceDate,
                      status: status,
                    });
                    fetchAndSetAttendanceStatus();
                  }}
                  value={attendanceStatus}
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default StudentAttendancePage;
