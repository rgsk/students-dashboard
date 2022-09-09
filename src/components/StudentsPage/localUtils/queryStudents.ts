import students from 'mockData/students.json';

const getStudents = (params?: { page?: number; perPage?: number }) => {
  const page = params?.page ?? 1;
  const perPage = params?.perPage ?? 10;
  const startIndex = (page - 1) * perPage;
  const studentsForGivenPage = students.slice(startIndex, startIndex + perPage);
  return studentsForGivenPage;
};

const getTotalNumberOfStudents = () => {
  return students.length;
};

const queryStudents = {
  getStudents,
  getTotalNumberOfStudents,
};
export default queryStudents;
