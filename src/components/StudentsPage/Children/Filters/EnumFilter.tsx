import { useMemo } from 'react';
import { FilterProps, Renderer } from 'react-table';
import { TStudent } from 'types/generalTypes';
import { ExtendedColumnInstance } from '../StudentsTable';

const EnumFilter: Renderer<FilterProps<TStudent>> = ({ column }) => {
  const {
    filterValue,
    setFilter,
    options = [],
  } = column as ExtendedColumnInstance<TStudent>;

  return (
    <div>
      <select
        className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
        value={filterValue}
        onChange={(event) => setFilter(event.target.value)}
      >
        <option value={''}>all</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
};
export default EnumFilter;
