import StudentsTable from './Children/StudentsTable';

interface IStudentsPageProps {}
const StudentsPage: React.FC<IStudentsPageProps> = ({}) => {
  return (
    <div>
      <StudentsTable />
      <div>
        <p>Note: Click on the row to mark attendance for particular student</p>
      </div>
    </div>
  );
};
export default StudentsPage;
