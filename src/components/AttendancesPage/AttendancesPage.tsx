import { addMonths } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import getDatesForMonthView from './localUtils/getDatesForMonthView';

interface IAttendancesPageProps {}
const AttendancesPage: React.FC<IAttendancesPageProps> = ({}) => {
  const [currentlyViewedDate, setCurrentlyViewedDate] = useState(new Date());

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
            {date.toDateString()}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AttendancesPage;
