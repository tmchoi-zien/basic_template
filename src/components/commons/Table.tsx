import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
  Row,
  Cell,
} from "@tanstack/react-table";
import { downloadCSV, exportCSV } from "@/utils/CSVParser";
import * as t from "@/locale/ko/test-id.json";
import Button from "./Button";

export type TableProps<T> = {
  columns: ColumnDef<T>[];
  rows: T[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  noDataMessage?: string;
  showExport?: boolean;
  showSearch?: boolean;
  search?: string;
  setSearch?: (search: string) => void;
  setSearchType?: (search: string) => void;
  setSearchType2?: (search: string) => void;
  customSize?: boolean;
};

export default function Table<T>({
  rows,
  columns,
  noDataMessage = "데이터가 없습니다.",
  showExport = false,
  showSearch = false,
  page,
  setPage,
  totalPages,
  search,
  setSearch,
  setSearchType,
  setSearchType2,
  customSize = false,
}: TableProps<T>) {
  const handlePageChange = (page: number) => {
    setPage && setPage(page);
  };

  // csv export 기능
  const handleExport = () => {
    const csvContent = exportCSV(columns, rows);
    downloadCSV(csvContent, "test.csv");
  };

  const table = useReactTable<T>({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { getHeaderGroups, getRowModel } = table;
  const isNoData = getRowModel().rows.length === 0;

  const visiblePages = useMemo(() => {
    const start = Math.max(0, page - 3);
    const end = Math.min(totalPages - 1, page + 3);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages]);

  return (
    <div data-testid={[t.component["table"]]} className="w-full">
      {/* Export 기능 */}
      {showExport && (
        <div data-testid="export" className="flex justify-end mb-4">
          <Button
            color="navy"
            size="xs"
            text="CSV다운로드"
            icon="plus"
            type="button"
            onClick={handleExport}
          />
        </div>
      )}

      {/* 검색 기능 */}
      {showSearch && (
        <div data-testid="search" className="p-4 bg-gray-100">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch && setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* 테이블 헤더 */}
      <div className="flex flex-col">
        {getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} className="flex justify-center">
            {headerGroup.headers.map((header) => (
              <div
                key={header.id}
                className="flex justify-center flex-1 px-4 py-2 text-sm text-gray-400 uppercase items-center"
                style={
                  customSize
                    ? {
                        minWidth: `${header.column.columnDef.size}px`,
                        flex: `0 0 ${header.column.columnDef.size}px`,
                      }
                    : {}
                }
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 테이블 row */}
      <div className="flex flex-col divide-y divide-gray-200 mb-4">
        {isNoData ? (
          <div className="w-full flex justify-center items-center">
            {noDataMessage}
          </div>
        ) : (
          getRowModel().rows.map((row: Row<T>) => (
            <div
              key={row.id}
              className="flex justify-center"
              data-testid={`row-${row.id}`}
            >
              {row.getVisibleCells().map((cell: Cell<T, any>) => {
                return (
                  <div
                    key={cell.id}
                    className="flex flex-1 justify-center items-center px-4 py-2 truncate text-xs overflow-hidden whitespace-pre-line"
                    style={
                      customSize
                        ? {
                            minWidth: `${cell.column.columnDef.size}px`,
                            flex: `0 0 ${cell.column.columnDef.size}px`,
                          }
                        : {}
                    }
                  >
                    {/* {cell.getValue()} */}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center p-4 space-x-2">
          {page > 0 && (
            <button
              onClick={() => handlePageChange(page - 1)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              {"<<"}
            </button>
          )}
          {visiblePages.map((index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={`px-4 py-2 border rounded ${
                page !== undefined && page === index
                  ? "bg-navy text-white"
                  : "bg-white text-navy"
              }`}
            >
              {index + 1}
            </button>
          ))}
          {page < totalPages - 1 && (
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              {">>"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
