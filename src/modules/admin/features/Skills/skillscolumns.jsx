import { createColumnHelper } from "@tanstack/react-table";
import HeaderCellWithSorting from "@/modules/student/components/HeaderCellWithSorting";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const columnHelper = createColumnHelper();

export const skillColumns = [
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
  columnHelper.accessor("type", {
    header: "Type",
    cell: ({ row }) => (
      <Badge variant={row.original.type === "general" ? "default" : "secondary"}>
        {row.original.type === "general" ? "General" : "Custom"}
      </Badge>
    ),
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
          onClick={() => row.original.onDelete(row.original.id)}
        >
          Delete
        </Button>
      </div>
    ),
  }),
];