import { FilterProps, Renderer } from 'react-table';
import { TStudent } from 'types/generalTypes';
import { ExtendedColumnInstance } from '../StudentsTable';

/*
 this file referred for writing below filter
 https://github.com/TanStack/table/blob/v7/src/filterTypes.js
*/

const BetweenFilter: Renderer<FilterProps<TStudent>> = ({ column }) => {
  const { filterValue, setFilter, range } =
    column as ExtendedColumnInstance<TStudent>;
  const [min, max] = filterValue ?? [];
  return (
    <div className="flex space-x-1">
      <input
        className="my-input w-[150px]"
        type="number"
        value={min ?? ''}
        placeholder="min"
        min={range?.min}
        max={range?.max}
        onChange={(e) =>
          setFilter([e.target.value ? Number(e.target.value) : undefined, max])
        }
      />
      <input
        className="my-input"
        type="number"
        value={max ?? ''}
        placeholder="max"
        min={range?.min}
        max={range?.max}
        onChange={(e) =>
          setFilter([min, e.target.value ? Number(e.target.value) : undefined])
        }
      />
    </div>
  );
};
export default BetweenFilter;
