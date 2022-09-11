import { useCallback, useMemo } from 'react';
import { TAttendance, TAttendanceStatus } from 'types/generalTypes';
import useLocalStorage from './useLocalStorage';
import useStateRef from './useStateRef';
const formKey = (data: { studentId: number; date: string }) => {
  return JSON.stringify(data);
};
const parseKey: (key: string) => { studentId: number; date: string } = (
  key
) => {
  return JSON.parse(key);
};
const useAttendancesTable = () => {
  const [attendancesMap, setAttendancesMap] = useLocalStorage<
    Record<string, TAttendanceStatus>
  >('attendancesMap', {});

  const attendancesMapRef = useStateRef(attendancesMap);

  const markAttendance = useCallback(
    (attendance: TAttendance) => {
      setAttendancesMap({
        ...attendancesMapRef.current,
        [formKey({ studentId: attendance.studentId, date: attendance.date })]:
          attendance.status,
      });
    },
    [attendancesMapRef, setAttendancesMap]
  );
  const getAttendance = useCallback(
    (data: { studentId: number; date: string }) => {
      return attendancesMap[formKey(data)] as TAttendanceStatus | undefined;
    },
    [attendancesMap]
  );
  const attendances: TAttendance[] = useMemo(() => {
    const table = Object.keys(attendancesMap).map((key) => {
      return {
        ...parseKey(key),
        status: attendancesMap[key],
      };
    });
    return table;
  }, [attendancesMap]);
  return {
    attendancesMap,
    attendances,
    markAttendance,
    getAttendance,
  };
};
export default useAttendancesTable;
