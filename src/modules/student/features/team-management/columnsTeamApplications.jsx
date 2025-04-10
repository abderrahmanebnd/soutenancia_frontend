import { createColumnHelper } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import SkillsHoverButton from "@/components/commun/SkillsHoverButton";

import HeaderCellWithSorting from "../../components/HeaderCellWithSorting";
import ActionsButtonsCell from "../../components/ActionsButtonsCell";
import HoverTextCell from "../../components/HoverTextCell";
import { CircleCheck, CircleX, Clock } from "lucide-react";

const columnHelper = createColumnHelper();

export const columnsTeamApplications = [
  columnHelper.accessor("studentName", {
    header: ({ column }) => {
      return (
        <HeaderCellWithSorting
          title="Student Name"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return <p className="font-semibold">{row.original.studentName}</p>;
    },
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <HeaderCellWithSorting
          title="Email"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
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

  columnHelper.accessor("generalSkills", {
    header: "Skills",
    cell: ({ row }) => {
      return (
        <SkillsHoverButton
          generalSkillsArray={row.original.generalSkills}
          customSkillsArray={row.original.customSkills}
        />
      );
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
      return <HoverTextCell text={row.getValue("message")} />;
    },
  }),
  columnHelper.accessor("actions", {
    header: "Actions",
    cell: ({ row }) => <ActionsButtonsCell row={row} />,
  }),
];