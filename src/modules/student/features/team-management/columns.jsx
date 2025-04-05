import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, CircleCheck, CircleX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SkillsHoverButton from "@/components/commun/SkillsHoverButton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor("studentName", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="font-semibold">{row.original.studentName}</p>;
    },
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
    header: "Status",
    cell: ({ row }) => {
      switch (row.original.status) {
        case "pending":
          return <Badge variant="pending">Pending</Badge>;
        case "accepted":
          return <Badge variant="success">Accepted</Badge>;
        case "rejected":
          return <Badge variant="destructive">Rejected</Badge>;
        default:
          return null;
      }
    },
  }),

  columnHelper.accessor("skills", {
    header: "Skills",
    cell: ({ row }) => {
      return <SkillsHoverButton skillsArray={row.original.skills} />;
    },
    filterFn: (row, columnId, filterValue) => {
      const rowSkills = row.getValue(columnId);
      return filterValue.every((selectedSkill) =>
        rowSkills.includes(selectedSkill)
      );
    },
  }),
  columnHelper.accessor("message", {
    header: "Message",
    cell: ({ row }) => {
      const message = row.getValue("message");

      return (
        <HoverCard>
          <HoverCardTrigger>
            <p className="max-w-[200px] truncate  border-2 rounded-md p-1 text-sm text-muted-foreground cursor-pointer">
              {message}
            </p>
          </HoverCardTrigger>
          <HoverCardContent>{message}</HoverCardContent>
        </HoverCard>
      );
    },
  }),
  columnHelper.accessor("actions", {
    header: "Actions",
    cell: ({ row }) => {
      const student = row.original;

      function handleAccept() {
        console.log(`Accepting student: ${student.id}`);
      }

      function handleReject() {
        console.log(`Rejecting student: ${student.id}`);
      }

      return (
        <div className="flex items-center gap-2 flex-col sm:flex-row">
          <Button
            variant="outline"
            size="sm"
            className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200 rounded-full h-6 hover:text-green-600"
            onClick={handleAccept}
          >
            Accept
            <CircleCheck />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200 rounded-full h-6 hover:text-red-600"
            onClick={handleReject}
          >
            Reject <CircleX />
          </Button>
        </div>
      );
    },
  }),
];
