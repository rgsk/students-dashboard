import StudentsTable from './Children/StudentsTable';

interface IStudentsPageProps {}
const StudentsPage: React.FC<IStudentsPageProps> = ({}) => {
  return (
    <div>
      <StudentsTable />
    </div>
  );
};
export default StudentsPage;
