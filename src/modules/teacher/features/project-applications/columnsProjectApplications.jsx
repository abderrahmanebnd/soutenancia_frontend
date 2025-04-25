import { createColumnHelper } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import { CircleCheck, CircleX, Clock, MoreHorizontal } from "lucide-react";
import HeaderCellWithSorting from "@/modules/student/components/HeaderCellWithSorting";
import HoverTextCell from "@/modules/student/components/HoverTextCell";
import TeacherActionsButtonsCell from "../../components/TeacherActionsButtonsCell";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const columnHelper = createColumnHelper();

export const columnsProjectApplications = [
  columnHelper.accessor("teamTitle", {
    header: ({ column }) => {
      return (
        <HeaderCellWithSorting
          title="Team Name"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return <p className="font-semibold">{row.original.teamTitle}</p>;
    },
  }),
  columnHelper.accessor("leaderName", {
    header: ({ column }) => {
      return (
        <HeaderCellWithSorting
          title="Leader Name"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return <p className="font-semibold">{row.original.leaderName}</p>;
    },
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      switch (row.original.status) {
        case "pending":
          return (
            <Badge variant="pending">
              <Clock size={16} className="mr-1" />
              Pending
            </Badge>
          );
        case "accepted":
          return (
            <Badge variant="success">
              <CircleCheck size={16} className="mr-1" />
              Accepted
            </Badge>
          );
        case "rejected":
          return (
            <Badge variant="destructive">
              <CircleX size={16} className="mr-1" /> Rejected
            </Badge>
          );
        case "canceled":
          return (
            <Badge variant="destructive">
              <CircleX size={16} className="mr-1" />
              Canceled
            </Badge>
          );
        default:
          return null;
      }
    },
  }),

  columnHelper.accessor("message", {
    header: "Message",
    cell: ({ row }) => {
      return <HoverTextCell text={row.getValue("message")} />;
    },
  }),
  columnHelper.accessor("actions", {
    header: "Actions",
    cell: ({ row }) => {
      return <TeacherActionsButtonsCell row={row} />;
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
              <Link to={`/teacher/team-details/${row.original.teamOfferId}`}>
                View Team Details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
