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
    <div className="px-4 pt-2 pb-4">
      {showDay && (
        <p className="text-center uppercase">{format(date, 'iii')}</p>
      )}
      <p className="text-center">
        {format(date, 'd')} {date.getDate() === 1 ? format(date, 'MMM') : ''}
      </p>
      <div className="mt-3">
        <p>
          Present:{' '}
          <span className="text-green-600">{attendanceDetails.present}</span>
        </p>
        <p>
          Absent:{' '}
          <span className="text-red-600">{attendanceDetails.absent}</span>
        </p>
        <p>
          Unmarked:{' '}
          <span className="text-yellow-600">
            {totalStudents -
              (attendanceDetails.present + attendanceDetails.absent)}
          </span>
        </p>
      </div>
    </div>
  );
};
export default MonthlyBlock;
