import { createColumnHelper } from "@tanstack/react-table";
import HeaderCellWithSorting from "@/modules/student/components/HeaderCellWithSorting";
import { Button } from "@/components/ui/button";

const columnHelper = createColumnHelper();

export const projectSelectionColumns = [
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
        title="Project Selection Start"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => new Date(row.original.startDate).toLocaleDateString()
  }),
  columnHelper.accessor("endDate", {
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Project Selection End"
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
          size="sm"
          onClick={() => row.original.onEdit()}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => row.original.onDelete()}
        >
          Delete
        </Button>
      </div>
    )
  })
];