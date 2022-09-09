import students from 'mockData/students.json';
import { TStudent } from 'types/generalTypes';

const getStudents = (params?: { page?: number; perPage?: number }) => {
  const page = params?.page ?? 1;
  const perPage = params?.perPage ?? 10;
  const startIndex = (page - 1) * perPage;
  const studentsForGivenPage = students.slice(startIndex, startIndex + perPage);
  return studentsForGivenPage as TStudent[];
};

const getTotalNumberOfStudents = () => {
  return students.length;
};

const getStudentById = (id: number) => {
  return students.find((s) => s.id === id) as TStudent;
};

const queryStudents = {
  getStudents,
  getTotalNumberOfStudents,
  getStudentById,
};
export default queryStudents;