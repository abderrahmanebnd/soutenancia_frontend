// src/components/specialties/specialtyColumns.js
import { createColumnHelper } from "@tanstack/react-table";
import HeaderCellWithSorting from "@/modules/student/components/HeaderCellWithSorting";
import { Button } from "@/components/ui/button";

const columnHelper = createColumnHelper();

export const specialtyColumns = [
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Name"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <p className="font-semibold text-primary capitalize">{row.original.name}</p>
    ),
  }),
  columnHelper.accessor("year", {
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Year"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => <p>Year {row.original.year}</p>,
  }),
  columnHelper.accessor("actions", {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => row.original.onEdit(row.original)}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => row.original.onDelete(row.original._id)}
        >
          Delete
        </Button>
      </div>
    ),
  }),
];