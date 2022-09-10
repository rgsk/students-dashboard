import { format } from 'date-fns';

const getAttendanceDateString = (dateInstance: Date) => {
  return format(dateInstance, 'yyyy-MM-dd');
};
const generalUtils = {
  getAttendanceDateString,
};
export default generalUtils;
