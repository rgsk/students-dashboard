

interface IStudentAttendancePageProps {
  id: number;
}
const StudentAttendancePage: React.FC<IStudentAttendancePageProps> = ({
  id,
}) => {
  console.log({ id });
  return <div>StudentAttendancePage</div>;
};
export default StudentAttendancePage;
