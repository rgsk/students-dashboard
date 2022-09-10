import dynamic from 'next/dynamic';

// data getting populated by localStorage was
// leading to rendering different stuff on server and client side
// we did this to prevent error raised by nextjs
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
