import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { Badge } from "../ui/badge";
import { useSearchParams } from "react-router";

export function UserDataTable({
  columns,
  data,

  totalPages,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });
  function nextPage() {
    const nextPage = parseInt(currentPage) + 1;
    searchParams.set("page", nextPage);
    setSearchParams(searchParams);
  }
  function previousPage() {
    const previousPage = parseInt(currentPage) - 1;
    searchParams.set("page", previousPage);
    setSearchParams(searchParams);
  }
  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        {/* Page information text */}
        <div className="text-sm text-primary">
          Page{" "}
          <Badge variant="outline" className="rounded-md text-primary">
            {currentPage}
          </Badge>{" "}
          of{" "}
          <Badge variant="outline" className="rounded-md text-primary">
            {totalPages}
          </Badge>{" "}
        </div>

        {/* Pagination buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => previousPage()}
            disabled={parseInt(currentPage) <= 1}
            className="text-primary"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => nextPage()}
            disabled={parseInt(currentPage) >= totalPages}
            className="text-primary"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
