import studentsApi from 'api/studentsApi';
import { format } from 'date-fns';

const totalStudents = studentsApi.getTotalNumberOfStudents();

interface IMonthlyBlockProps {
  showDay: boolean;
  attendanceDetails: { present: number; absent: number };
  date: Date;
}
const MonthlyBlock: React.FC<IMonthlyBlockProps> = ({
  showDay,
  attendanceDetails,
  date,
}) => {
  return (
    <div className="px-4 py-2">
      {showDay && (
        <p className="text-center uppercase">{format(date, 'iii')}</p>
      )}
      <p className="text-center">
        {format(date, 'd')} {date.getDate() === 1 ? format(date, 'MMM') : ''}
      </p>
      <div className="mt-6">
        <p>
          Present:{' '}
          <span className="text-green-600 font-bold">
            {attendanceDetails.present}
          </span>
        </p>
        <p>
          Absent:{' '}
          <span className="text-red-600 font-bold">
            {attendanceDetails.absent}
          </span>
        </p>
        <p>
          Unmarked:{' '}
          <span className="text-yellow-600 font-bold">
            {totalStudents -
              (attendanceDetails.present + attendanceDetails.absent)}
          </span>
        </p>
      </div>
    </div>
  );
};
export default MonthlyBlock;
