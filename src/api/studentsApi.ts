import students from 'mockData/students.json';

const getStudents = () => {
  return students;
};

const getStudentById = (id: number) => {
  return students.find((s) => s.id === id);
};

const getTotalNumberOfStudents = () => {
  return students.length;
};

const studentsApi = {
  getStudents,
  getStudentById,
  getTotalNumberOfStudents,
};
export default studentsApi;
