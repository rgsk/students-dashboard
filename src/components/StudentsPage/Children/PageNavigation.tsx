import { useEffect } from 'react';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'components/Shared/Icons';

import IconButton from './IconButton';

interface IPageNavigationProps {
  totalCount: number;
  gotoPage: (page: number) => void;
  setPerPage: (size: number) => void;
  currentPage: number;
  perPage: number;
}
const PageNavigation: React.FC<IPageNavigationProps> = ({
  totalCount,
  gotoPage,
  setPerPage,
  currentPage,
  perPage,
}) => {
  const totalPages = Math.ceil(totalCount / perPage);
  const canPreviousPage = currentPage !== 1;
  const canNextPage = currentPage !== totalPages;

  useEffect(() => {
    if (currentPage > totalPages) {
      gotoPage(totalPages);
    }
  }, [currentPage, gotoPage, perPage, totalPages]);

  return (
    <div className="mt-2 flex items-center justify-end gap-4">
      <div className="flex gap-1">
        <IconButton onClick={() => gotoPage(1)} disabled={!canPreviousPage}>
          {ChevronsLeftIcon}
        </IconButton>
        <IconButton
          onClick={() => gotoPage(currentPage - 1)}
          disabled={!canPreviousPage}
        >
          {ChevronLeftIcon}
        </IconButton>
        <IconButton
          onClick={() => gotoPage(currentPage + 1)}
          disabled={!canNextPage}
        >
          {ChevronRightIcon}
        </IconButton>
        <IconButton
          onClick={() => gotoPage(totalPages)}
          disabled={!canNextPage}
        >
          {ChevronsRightIcon}
        </IconButton>
      </div>
      <span>
        Page{' '}
        <strong>
          {currentPage} of {totalPages}
        </strong>
      </span>
      <span>
        Go to page:
        <input
          type="number"
          defaultValue={currentPage + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) : 1;
            gotoPage(page);
          }}
          className="w-12 rounded border border-gray-200 p-1 text-gray-700"
        />
      </span>
      <select
        value={perPage}
        onChange={(e) => {
          setPerPage(Number(e.target.value));
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
};
export default PageNavigation;
