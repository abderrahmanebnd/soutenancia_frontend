import { createColumnHelper } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { CircleCheck, CircleX, Clock, MoreHorizontal } from "lucide-react";
import HeaderCellWithSorting from "@/modules/student/components/HeaderCellWithSorting";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const columnHelper = createColumnHelper();

export const columnsManageMyTeams = [
  columnHelper.accessor("title", {
    header: ({ column }) => {
      return (
        <HeaderCellWithSorting
          title="title"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return <p className="font-semibold">{row.original.title}</p>;
    },
  }),
  columnHelper.accessor("maxMembers", {
    header: ({ column }) => {
      return (
        <HeaderCellWithSorting
          title="Max Members"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return <p className="font-semibold">{row.original.max_members}</p>;
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      console.log("Row data:", row.original.status);
      switch (row.original.status) {
        case "open":
          return (
            <Badge variant="destructive">
              <CircleX size={16} className="mr-1" /> open
            </Badge>
          );
        case "closed":
          return (
            <Badge variant="destructive">
              <CircleX size={16} className="mr-1" />
              closed
            </Badge>
          );

        default:
          return null;
      }
    },
  }),
  columnHelper.accessor("teamDetails", {
    header: "Team Details",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="p-0 h-8 w-8">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link
                to={`/teacher/manage-team/${row.original.id}/project/${row.original.assignedProjectId}`}
              >
                Sprints management
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
