import { ChevronLeftIcon, ChevronRightIcon } from 'components/Shared/Icons';
import IconButton from 'components/Shared/IconButton';
import { addMonths, format } from 'date-fns';
import useAttendancesTable from 'hooks/useAttendancesTable';
import { useCallback, useMemo, useState } from 'react';
import generalUtils from 'utils/generalUtils';
import MonthlyBlock from './Children/MonthlyBlock';
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
      <div className="flex space-x-4 items-center mb-5">
        <IconButton
          onClick={() => {
            setCurrentlyViewedDate(new Date());
          }}
        >
          Today
        </IconButton>
        <div className="flex space-x-2">
          <IconButton onClick={navigateToPrevMonth}>
            {ChevronLeftIcon}
          </IconButton>
          <IconButton onClick={navigateToNextMonth}>
            {ChevronRightIcon}
          </IconButton>
        </div>
        <div className="flex space-x-2">
          <div>{format(currentlyViewedDate, 'MMMM')}</div>
          <div>{currentlyViewedDate.getFullYear()}</div>
        </div>
      </div>
      <div
        className="h-screen grid grid-cols-7
                   bg-gray-200 gap-[1px] border-gray-200 border
                   "
      >
        {currentMonthDisplayedDates.map((date, i) => (
          <div key={i} className="bg-white">
            <MonthlyBlock
              showDay={i < 7} // we show day only for 1st row
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
