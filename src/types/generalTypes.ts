export enum EGender {
  Male = 'Male',
  Female = 'Female',
  Genderfluid = 'Genderfluid',
  Agender = 'Agender',
  'Non-binary' = 'Non-binary',
  Polygender = 'Polygender',
  Genderqueer = 'Genderqueer',
}
export type TStudent = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  rollNumber: number;
  age: number;
  gender: string;
};

export type TAttendanceStatus = 'present' | 'absent';

export type TAttendance = {
  studentId: number;
  date: string;
  status: TAttendanceStatus;
};
