import React, { useMemo } from 'react';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight, BiSolidEdit, BiSolidTrash } from 'react-icons/bi';

import Card from '@/components/card';
import ButtonCreate from '@/components/table/ButtonCreate';

const DevTableTemplate = (props) => {
  const { title, buttonText, columnsData, tableData, onClickEdit, onClickDelete } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 10;

  return (
    <Card extra={'w-full h-full p-4'}>
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">{title}</div>
        <ButtonCreate text={buttonText} onClick={() => onClickEdit('new')} />
      </div>

      <div className="h-full overflow-x-scroll xl:overflow-x-hidden">
        <table {...getTableProps()} className="mt-8 h-max w-full" color="gray-500">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border-b border-gray-200 text-start dark:!border-navy-700"
                    key={index}
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600">{column.render('Header')}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = '';
                    if (cell.column.Header === 'ACTION') {
                      data = (
                        <div className="flex gap-3">
                          <button onClick={() => onClickEdit(cell.row.original)} className="w-7 h-7 bg-orange-500 rounded-md p-1 text-white">
                            <BiSolidEdit className="m-auto" />
                          </button>
                          <button onClick={() => onClickDelete(cell.row.original)} className="w-7 h-7 bg-orange-500 rounded-md p-1 text-white">
                            <BiSolidTrash className="m-auto" />
                          </button>
                        </div>
                      );
                    } else if (cell.column.Header === 'USERS') {
                      data = <p className="text-sm font-semibold text-navy-700 dark:text-white">{cell.value.length}</p>;
                    } else {
                      data = <p className="text-sm font-semibold text-navy-700 dark:text-white">{cell.value}</p>;
                    }
                    return (
                      <td
                        {...cell.getCellProps({
                          style: {
                            width: cell.column.width ?? 'auto',
                          },
                        })}
                        key={index}
                        className="pt-[14px] pb-3 text-[14px]"
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-center mt-4 text-white">
          <button
            className="text-xl w-7 h-7 flex justify-center items-center disabled:opacity-50 bg-orange-500 rounded-md mx-1"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <BiChevronsLeft />
          </button>
          <button
            className="text-xl w-7 h-7 flex justify-center items-center disabled:opacity-50 bg-orange-500 rounded-md mx-1"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <BiChevronLeft />
          </button>
          <span className="mx-4 text-sm text-navy-700 dark:text-white">
            {pageIndex + 1} of {pageCount}
          </span>
          <button
            className="text-xl w-7 h-7 flex justify-center items-center disabled:opacity-50 bg-orange-500 rounded-md mx-1"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <BiChevronRight />
          </button>
          <button
            className="text-xl w-7 h-7 flex justify-center items-center disabled:opacity-50 bg-orange-500 rounded-md mx-1"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <BiChevronsRight />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default DevTableTemplate;
