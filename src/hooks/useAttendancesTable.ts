import { useCallback, useState } from 'react';
import { TAttendance, TAttendanceStatus } from 'types/generalTypes';
import useLocalStorage from './useLocalStorage';
import useStateRef from './useStateRef';
const formKey = (data: { studentId: number; date: string }) => {
  return JSON.stringify(data);
};
const useAttendancesTable = () => {
  const [attendances, setAttendances] = useLocalStorage<
    Record<string, TAttendanceStatus>
  >('attendances', {});

  const attendancesRef = useStateRef(attendances);

  const markAttendance = useCallback(
    (attendance: TAttendance) => {
      setAttendances({
        ...attendancesRef.current,
        [formKey({ studentId: attendance.studentId, date: attendance.date })]:
          attendance.status,
      });
    },
    [attendancesRef, setAttendances]
  );
  const getAttendance = useCallback(
    (data: { studentId: number; date: string }) => {
      return attendances[formKey(data)] as TAttendanceStatus | undefined;
    },
    [attendances]
  );
  return {
    attendances,
    markAttendance,
    getAttendance,
  };
};
export default useAttendancesTable;
