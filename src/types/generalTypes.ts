export type TStudent = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  rollNumber: number;
  age: number;
  gender: 'Male' | 'Female';
};
export enum EAttendanceStatus {
  present = 'present',
  absent = 'absent',
}
export type TAttendance = {
  studentId: number;
  date: Date;
  status: EAttendanceStatus;
};
