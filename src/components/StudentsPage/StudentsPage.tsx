import { useEffect, useState } from 'react';

import queryStudents from './localUtils/queryStudents';

interface IStudentsPageProps {}
const StudentsPage: React.FC<IStudentsPageProps> = ({}) => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [students, setStudents] = useState();

  useEffect(() => {
    const students = queryStudents.getStudents({ page: 68, perPage: 15 });
    console.log(students);
  }, []);
  return <div>StudentsPage</div>;
};
export default StudentsPage;
