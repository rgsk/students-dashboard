import { useState } from 'react';
import { FilterProps, Renderer, UseFiltersColumnProps } from 'react-table';
import { useAsyncDebounce } from 'react-table';
import { TStudent } from 'types/generalTypes';
import { ExtendedColumnInstance } from '../StudentsTable';

const TextFilter: Renderer<FilterProps<TStudent>> = ({ column }) => {
  const { filterValue, setFilter } = column as ExtendedColumnInstance<TStudent>;
  const [value, setValue] = useState(filterValue);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 300);
  return (
    <span>
      <input
        className="my-input"
        value={value ?? ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
};
export default TextFilter;
