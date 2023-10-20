import Card from '@/components/card';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { useMemo } from 'react';

const ComplexTable = (props) => {
  const { columnsData, tableData } = props;

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

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, initialState } = tableInstance;
  initialState.pageSize = 5;

  const formatMilisec = (second) => {
    const totalSeconds = Math.floor(second);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let result = '';
    if (hours > 0) {
      result += `${hours} hours, `;
    }
    if (minutes > 0) {
      result += `${minutes} minutes, `;
    }
    result += `${seconds} seconds`;

    return result;
  };

  return (
    <Card extra={'w-full h-full px-6 pb-6 sm:overflow-x-auto'}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">Staff&apos;s Work by Department</div>
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-4 text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">{column.render('Header')}</p>
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
                    if (cell.column.Header === 'USERS') {
                      data = <p className="text-sm font-semibold text-navy-700 dark:text-white">{cell.value.length}</p>;
                    } else if (cell.column.Header.includes('Response')) {
                      data = <p className="text-sm font-semibold text-navy-700 dark:text-white">{formatMilisec(parseInt(cell.value))}</p>;
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
                        className="pt-[14px] pr-4 pb-3 text-[14px]"
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
      </div>
    </Card>
  );
};

export default ComplexTable;
