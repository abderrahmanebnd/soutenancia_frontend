import { createColumnHelper } from "@tanstack/react-table";
import HeaderCellWithSorting from "@/modules/student/components/HeaderCellWithSorting";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";
import InlineSpinner from "@/components/commun/InlineSpinner";

const columnHelper = createColumnHelper();

export const skillColumns = [
  columnHelper.accessor("skill", {
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Category"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <p className="font-semibold text-primary capitalize">{row.original.skill}</p>
    ),
  }),
  columnHelper.accessor("technology", {
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Technology"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <p className="font-semibold text-primary capitalize">{row.original.technology}</p>
    ),
  }),
  columnHelper.accessor("actions", {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="lg"
          className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200 rounded-full h-6 hover:text-blue-600"
          onClick={() => row.original.onEdit(row.original)}
        >
          Edit <Edit className="ml-1 h-3 w-3" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200 rounded-full h-6 hover:text-red-600"
          onClick={() => row.original.onDelete(row.original.id)}
          disabled={row.original.isDeleting}
        >
          {row.original.isDeleting ? (
            <InlineSpinner className="mr-1 h-3 w-3" />
          ) : (
            <>
              Delete <Trash className="ml-1 h-3 w-3" />
            </>
          )}
        </Button>
      </div>
    ),
  }),
];