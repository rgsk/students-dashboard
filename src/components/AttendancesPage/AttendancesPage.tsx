import queryStudents from 'components/StudentsPage/localUtils/queryStudents';
import { addMonths } from 'date-fns';
import useAttendancesTable from 'hooks/useAttendancesTable';
import { useCallback, useMemo, useState } from 'react';
import generalUtils from 'utils/generalUtils';
import getDatesForMonthView from './localUtils/getDatesForMonthView';

interface IAttendancesPageProps {}
const AttendancesPage: React.FC<IAttendancesPageProps> = ({}) => {
  const [currentlyViewedDate, setCurrentlyViewedDate] = useState(new Date());
  const { attendances } = useAttendancesTable();

  const currentMonthDisplayedDates = useMemo(() => {
    return getDatesForMonthView({
      year: currentlyViewedDate.getFullYear(),
      month: currentlyViewedDate.getMonth(),
    });
  }, [currentlyViewedDate]);

  const navigateToPrevMonth = useCallback(() => {
    setCurrentlyViewedDate(addMonths(currentlyViewedDate, -1));
  }, [currentlyViewedDate]);

  const navigateToNextMonth = useCallback(() => {
    setCurrentlyViewedDate(addMonths(currentlyViewedDate, 1));
  }, [currentlyViewedDate]);

  const attendancesDetailsGroupedByDate = useMemo(() => {
    const grouped: Record<string, { present: number; absent: number }> = {};
    for (const { date, status } of attendances) {
      if (grouped[date] === undefined) {
        grouped[date] = {
          present: 0,
          absent: 0,
        };
      }
      switch (status) {
        case 'present': {
          grouped[date].present++;
          break;
        }
        case 'absent': {
          grouped[date].absent++;
          break;
        }
      }
    }

    return grouped;
  }, [attendances]);

  return (
    <div className="px-5 pt-5">
      <div>
        <p onClick={navigateToPrevMonth}>prev</p>
        <p onClick={navigateToNextMonth}>next</p>
      </div>
      <div
        className="h-screen grid grid-cols-7
                   bg-gray-200 gap-[1px] border-gray-200 border
                   "
      >
        {currentMonthDisplayedDates.map((date, i) => (
          <div key={i} className="bg-white">
            <MonthlyBlock
              date={date}
              attendanceDetails={
                attendancesDetailsGroupedByDate[
                  generalUtils.getAttendanceDateString(date)
                ] ?? { present: 0, absent: 0 }
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default AttendancesPage;

const totalStudents = queryStudents.getTotalNumberOfStudents();

interface IMonthlyBlockProps {
  attendanceDetails: { present: number; absent: number };
  date: Date;
}
const MonthlyBlock: React.FC<IMonthlyBlockProps> = ({
  attendanceDetails,
  date,
}) => {
  return (
    <div>
      <p>{date.toDateString()}</p>
      <p>Present: {attendanceDetails.present}</p>
      <p>Absent: {attendanceDetails.absent}</p>
      <p>
        Unmarked:{' '}
        {totalStudents - (attendanceDetails.present + attendanceDetails.absent)}
      </p>
    </div>
  );
};
