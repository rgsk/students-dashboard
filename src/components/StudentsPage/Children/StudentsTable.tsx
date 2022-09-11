/* eslint-disable react/jsx-key */
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import {
  Column,
  useTable,
  useSortBy,
  usePagination,
  HeaderGroup,
  UseSortByColumnProps,
  TableInstance,
  UsePaginationState,
  UsePaginationInstanceProps,
} from 'react-table';
import { TStudent } from 'types/generalTypes';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'components/Shared/Icons';

import IconButton from '../../Shared/IconButton';
import studentsApi from 'api/studentsApi';

const students = studentsApi.getStudents();

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UsePaginationInstanceProps<T> & { state: UsePaginationState<T> };

interface IStudentsTableProps {}
const StudentsTable: React.FC<IStudentsTableProps> = ({}) => {
  const columns = useMemo<Column<TStudent>[]>(() => {
    return [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Roll Number',
        accessor: 'rollNumber',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
    ];
  }, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
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
    useSortBy,
    usePagination
  ) as TableInstanceWithHooks<TStudent>;
  const router = useRouter();

  return (
    <div className="pb-5">
      <div>
        <Table />
      </div>
      <div className="mt-7">
        <Pagination />
      </div>
    </div>
  );
  function Table() {
    return (
      <table
        {...getTableProps()}
        className="min-w-full table-fixed divide-y divide-gray-200 border"
      >
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((_column) => {
                const column = _column as HeaderGroup<TStudent> &
                  UseSortByColumnProps<TStudent>;
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
  function Pagination() {
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
            className="w-12 rounded border border-gray-200 p-1 text-gray-700"
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
