/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { TStudent } from 'types/generalTypes';

interface IStudentsTableProps {
  data: TStudent[];
}
const StudentsTable: React.FC<IStudentsTableProps> = ({ data }) => {
  const columns = useMemo<readonly Column<TStudent>[]>(() => {
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
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      className="min-w-full table-fixed divide-y divide-gray-200 border"
    >
      <thead className="bg-gray-100">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="py-3 px-6 text-left text-xs font-medium tracking-wider text-gray-700 "
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody
        {...getTableBodyProps()}
        className="divide-y divide-gray-200 bg-white"
      >
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="transition hover:bg-gray-100">
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
};
export default StudentsTable;
