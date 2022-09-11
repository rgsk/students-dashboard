import { TAttendance, TAttendanceStatus } from 'types/generalTypes';

type TAttendanceIdentifier = { studentId: number; date: string };

const formKey = (data: TAttendanceIdentifier) => {
  return JSON.stringify(data);
};
const parseKey: (key: string) => TAttendanceIdentifier = (key) => {
  return JSON.parse(key);
};

const ATTENDANCES_MAP_KEY = 'attendancesMap';
type TAttendancesMap = Record<string, TAttendanceStatus>;

const getAttendancesMap: () => TAttendancesMap = () => {
  const saved = window.localStorage.getItem(ATTENDANCES_MAP_KEY);
  return saved ? JSON.parse(saved) : {};
};

const setAttendancesMap = (attendancesMap: TAttendancesMap) => {
  window.localStorage.setItem(
    ATTENDANCES_MAP_KEY,
    JSON.stringify(attendancesMap)
  );
};

const markAttendance = (attendance: TAttendance) => {
  const attendancesMap = getAttendancesMap();
  setAttendancesMap({
    ...attendancesMap,
    [formKey({ studentId: attendance.studentId, date: attendance.date })]:
      attendance.status,
  });
};

const getAttendance = (data: TAttendanceIdentifier) => {
  const attendancesMap = getAttendancesMap();
  return attendancesMap[formKey(data)] as TAttendanceStatus | undefined;
};

const getAttendances = () => {
  const attendancesMap = getAttendancesMap();
  const table = Object.keys(attendancesMap).map((key) => {
    return {
      ...parseKey(key),
      status: attendancesMap[key],
    };
  });
  return table;
};

const attendancesApi = {
  markAttendance,
  getAttendance,
  getAttendances,
};
export default attendancesApi;
