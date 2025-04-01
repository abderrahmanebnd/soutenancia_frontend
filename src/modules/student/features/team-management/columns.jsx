import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor("studentName", {
    header: "Student Name",
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
  columnHelper.accessor("status", {
    //TODO: in the badge add variant for success processing and the others
    header: "Status",
    cell: ({ row }) => {
      switch (row.original.status) {
        case "pending":
          return <Badge variant="outline">Pending</Badge>;
        case "processing":
          return <Badge>Processing</Badge>;
        case "success":
          return <Badge>Success</Badge>;
        case "failed":
          return <Badge variant="destructive">Failed</Badge>;
        default:
          return null;
      }
    },
  }),
  columnHelper.accessor("skills", {
    header: "Skills",
  }),
];
