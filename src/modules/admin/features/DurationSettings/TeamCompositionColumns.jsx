import { createColumnHelper } from "@tanstack/react-table";
import HeaderCellWithSorting from "@/modules/student/components/HeaderCellWithSorting";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

const columnHelper = createColumnHelper();

export const teamCompositionColumns = [
  columnHelper.accessor("specialityName", {
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Speciality"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original.specialityName}</span>
    )
  }),
  columnHelper.accessor("startDate", {
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Team Formation Start"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => new Date(row.original.startDate).toLocaleDateString()
  }),
  columnHelper.accessor("endDate", {
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Team Formation End"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => new Date(row.original.endDate).toLocaleDateString()
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
          disabled={row.original.isEditing}
        >
          Edit <Edit className="ml-1 h-3 w-3" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200 rounded-full h-6 hover:text-red-600"
          onClick={() => row.original.onDelete(row.original._id)}
          disabled={row.original.isDeleting}
        >
          Delete <Trash className="ml-1 h-3 w-3" />
        </Button>
      </div>
    ),
  }),
];