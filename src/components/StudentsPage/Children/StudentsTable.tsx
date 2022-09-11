/* eslint-disable react/jsx-key */
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import {
  Column,
  useTable,
  useSortBy,
  usePagination,
  UseSortByColumnProps,
  TableInstance,
  UsePaginationState,
  UsePaginationInstanceProps,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  useFilters,
  ColumnInstance,
} from 'react-table';
import { EGender, TStudent } from 'types/generalTypes';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'components/Shared/Icons';

import IconButton from '../../Shared/IconButton';
import studentsApi from 'api/studentsApi';
import TextFilter from './Filters/TextFilter';
import BetweenFilter from './Filters/BetweenFilter';
import EnumFilter from './Filters/EnumFilter';
import NumberFilter from './Filters/NumberFilter';

const students = studentsApi.getStudents();

type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UsePaginationInstanceProps<T> & { state: UsePaginationState<T> };

type ExtraColumnProps = {
  options?: string[];
  range?: { min: number; max: number };
};

export type ExtendedColumnInstance<T extends object> = ColumnInstance<T> &
  UseSortByColumnProps<T> &
  UseFiltersColumnProps<T> &
  ExtraColumnProps;

interface IStudentsTableProps {}
const StudentsTable: React.FC<IStudentsTableProps> = ({}) => {
  const columns = useMemo<
    Column<TStudent>[] &
      UseFiltersColumnOptions<TStudent>[] &
      ExtraColumnProps[]
  >(() => {
    return [
      {
        Header: 'Id',
        accessor: 'id',
        Filter: NumberFilter,
        filter: 'exact',
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
        Filter: TextFilter,
        filter: 'text',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        Filter: TextFilter,
        filter: 'text',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        Filter: TextFilter,
        filter: (rows, columnIds, filterValue) => {
          // phone prefix should match
          return rows.filter((row) =>
            row.original.phone.startsWith(filterValue)
          );
        },
      },
      {
        Header: 'Email',
        accessor: 'email',
        Filter: TextFilter,
        filter: 'text',
      },
      {
        Header: 'Roll Number',
        accessor: 'rollNumber',
        Filter: NumberFilter,
        filter: 'exact',
      },
      {
        Header: 'Age',
        accessor: 'age',
        Filter: BetweenFilter,
        filter: 'between',
        range: {
          min: 16,
          max: 20,
        },
      },
      {
        Header: 'Gender',
        accessor: 'gender',
        Filter: EnumFilter,
        filter: 'exact',
        options: Object.keys(EGender),
      },
    ];
  }, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    allColumns,
    gotoPage,
    pageCount,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data: students },
    useFilters,
    useSortBy,
    usePagination
  ) as TableInstanceWithHooks<TStudent>;
  const router = useRouter();

  return (
    <div className="pb-5">
      <div>{renderFilterInputs()}</div>
      <div className="mt-7">{renderTable()}</div>
      <div className="mt-7">{renderPagination()}</div>
    </div>
  );

  function renderFilterInputs() {
    return (
      <div className="flex space-x-4">
        {allColumns.map((_column, i) => {
          const column = _column as ExtendedColumnInstance<TStudent>;
          return column.canFilter ? (
            <div key={i} className="flex-center space-x-2">
              <span>{column.render('Header')}: </span>
              <span>{column.render('Filter')}</span>
            </div>
          ) : null;
        })}
      </div>
    );
  }

  function renderTable() {
    return (
      <table
        {...getTableProps()}
        className="min-w-full table-fixed divide-y divide-gray-200 border"
      >
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((_column: any) => {
                const column = _column as ExtendedColumnInstance<TStudent>;
                return (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-3 px-6 text-left text-xs font-medium tracking-wider text-gray-700 "
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="divide-y divide-gray-200 bg-white"
        >
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => {
                  router.push(`/students/${row.cells[0].value}`);
                }}
                className="transition hover:bg-gray-100"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="py-2 px-6 text-sm font-medium text-gray-900"
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  function renderPagination() {
    return (
      <div className="flex items-center justify-end gap-4">
        <div className="flex gap-1">
          <IconButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {ChevronsLeftIcon}
          </IconButton>
          <IconButton onClick={previousPage} disabled={!canPreviousPage}>
            {ChevronLeftIcon}
          </IconButton>
          <IconButton onClick={nextPage} disabled={!canNextPage}>
            {ChevronRightIcon}
          </IconButton>
          <IconButton
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {ChevronsRightIcon}
          </IconButton>
        </div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>
        </span>
        <span>
          Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const newPageIndex = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(newPageIndex);
            }}
            className="w-[70px] rounded border border-gray-200 p-1 text-gray-700"
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className="rounded border border-gray-200 p-1 text-gray-700"
        >
          {[10, 20, 30, 40, 50].map((perPage) => (
            <option key={perPage} value={perPage}>
              Show {perPage}
            </option>
          ))}
        </select>
      </div>
    );
  }
};
export default StudentsTable;
