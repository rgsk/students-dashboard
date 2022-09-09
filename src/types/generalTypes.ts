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
  gender: EGender;
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
