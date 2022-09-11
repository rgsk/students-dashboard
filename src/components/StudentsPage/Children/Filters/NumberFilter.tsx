import { useState } from 'react';
import { FilterProps, Renderer, useAsyncDebounce } from 'react-table';
import { TStudent } from 'types/generalTypes';
import { ExtendedColumnInstance } from '../StudentsTable';

const NumberFilter: Renderer<FilterProps<TStudent>> = ({ column }) => {
  const { filterValue, setFilter } = column as ExtendedColumnInstance<TStudent>;
  const [value, setValue] = useState(filterValue);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value);
  }, 300);
  return (
    <input
      className="my-input"
      type="number"
      value={value ?? ''}
      onChange={(e) => {
        const newValue = e.target.value ? Number(e.target.value) : undefined;
        setValue(newValue);
        onChange(newValue);
      }}
    />
  );
};
export default NumberFilter;
