import { useEffect, useMemo, useState } from 'react';
import { TStudent } from 'types/generalTypes';

import PageNavigation from './Children/PageNavigation';
import queryStudents from './localUtils/queryStudents';

interface IStudentsPageProps {}
const StudentsPage: React.FC<IStudentsPageProps> = ({}) => {
  const [students, setStudents] = useState<TStudent[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const totalStudents = useMemo(() => {
    return queryStudents.getTotalNumberOfStudents();
  }, []);
  useEffect(() => {
    console.log(students);
  }, [students]);
  useEffect(() => {
    const _students = queryStudents.getStudents({
      page: page,
      perPage: perPage,
    });
    setStudents(_students);
  }, [page, perPage]);
  return (
    <div>
      <PageNavigation
        currentPage={page}
        perPage={perPage}
        gotoPage={setPage}
        setPerPage={setPerPage}
        totalCount={totalStudents}
      />
    </div>
  );
};
export default StudentsPage;