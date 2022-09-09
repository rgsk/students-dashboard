import { addDays, lastDayOfMonth } from 'date-fns';

const checkForDateStringEquality = (d1: Date, d2: Date) => {
  return d1.toDateString() === d2.toDateString();
};
const getDatesForMonthView = ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => {
  const datesAndDay: Date[] = [];

  let date = new Date(year, month);
  const day = date.getDay();
  date = addDays(date, -day);
  while (datesAndDay.length < 35) {
    datesAndDay.push(date);
    date = addDays(date, 1);
  }

  // either month or year of last item should be more
  // or last item should be last date of month
  // else add one more 7 length row
  const last = datesAndDay[datesAndDay.length - 1];
  if (
    !(last.getFullYear() > year) &&
    !(last.getMonth() > month) &&
    !checkForDateStringEquality(last, lastDayOfMonth(new Date(year, month)))
  ) {
    while (datesAndDay.length < 42) {
      datesAndDay.push(date);
      date = addDays(date, 1);
    }
  }

  return datesAndDay;
};
export default getDatesForMonthView;
