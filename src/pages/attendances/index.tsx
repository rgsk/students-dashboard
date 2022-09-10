import dynamic from 'next/dynamic';

const AttendancesPage = dynamic(
  () => import('components/AttendancesPage/AttendancesPage'),
  {
    ssr: false,
  }
);
interface IAttendancesRouteProps {}
const AttendancesRoute: React.FC<IAttendancesRouteProps> = ({}) => {
  return <AttendancesPage />;
};
export default AttendancesRoute;
