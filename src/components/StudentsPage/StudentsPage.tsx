import StudentsTable from './Children/StudentsTable';

interface IStudentsPageProps {}
const StudentsPage: React.FC<IStudentsPageProps> = ({}) => {
  return (
    <div>
      <StudentsTable />
      <div>
        <p className="text-lg">
          Note: Click on the row to mark attendance for particular student
        </p>
      </div>
    </div>
  );
};
export default StudentsPage;
