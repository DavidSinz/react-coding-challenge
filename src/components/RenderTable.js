import React, { useMemo } from "react";

import { useTable, usePagination } from "react-table";
import { COLUMNS } from "./columns";

export default function RenderTable(props) {
  const columns = useMemo(() => COLUMNS, []);
  const data = props.data;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav>
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="hide-on-med-and-down">
            <li>
              <a
                className="waves-effect waves-light btn-small"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {"<<"}
              </a>
            </li>
            <li>
              <a
                className="waves-effect waves-light btn-small"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </a>
            </li>
            <li>
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </span>
            </li>
            <li>
              <a
                className="waves-effect waves-light btn-small"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </a>
            </li>
            <li>
              <a
                className="waves-effect waves-light btn-small"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </a>
            </li>
            <li>
              <span>
                Number of absences: <strong>{props.totalNum}</strong>
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
