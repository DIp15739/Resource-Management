import React, { Fragment } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
  useResizeColumns,
} from 'react-table';
import { Filter, DefaultColumnFilter } from './filters';

const TableContainer = ({ columns, data }) => {
  const {
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: {
        Filter: DefaultColumnFilter,
        width: 150,
        minWidth: '180px',
      },
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useResizeColumns
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (
      column.isSortedDesc ? (
        <i className="fa fa-sort-down ml-2" />
      ) : (
        <i className="fa fa-sort-up ml-2" />
      )
    ) : (
      ''
    );
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <div>
      <div className="row mb-4">
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) => {
            return (
              column.canFilter && (
                <div className="col-sm-4" key={column.id}>
                  <Filter column={column} />
                </div>
              )
            );
          })
        )}
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} style={{ minWidth: 100 }}>
                    <div {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      {generateSortingIndicator(column)}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {!!page.length ? (
              page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan="100%" className="text-center">
                  NO DATA FOUND
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <nav className="mt-2">
        <ul className="pagination justify-content-end">
          <select
            type="select"
            className="mr-4 custom-select"
            style={{ width: 120 }}
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <li
            className={`page-item ${!canPreviousPage && 'disabled'}`}
            style={{ cursor: 'pointer' }}
          >
            <span className="page-link" onClick={previousPage}>
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
          <li className="page-item mx-3">
            <span className="page-link">
              <input
                type="number"
                min={1}
                style={{ width: 35, height: 20 }}
                max={pageOptions.length}
                value={pageIndex + 1}
                onChange={onChangeInInput}
              />{' '}
              / <strong>{pageOptions.length}</strong>
            </span>
          </li>
          <li
            className={`page-item ${!canNextPage && 'disabled'}`}
            style={{ cursor: 'pointer' }}
          >
            <span className="page-link" onClick={nextPage}>
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TableContainer;
