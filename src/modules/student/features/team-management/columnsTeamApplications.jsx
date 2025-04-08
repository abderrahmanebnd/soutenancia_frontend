import { createColumnHelper } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import SkillsHoverButton from "@/components/commun/SkillsHoverButton";

import HeaderCellWithSorting from "../../components/HeaderCellWithSorting";
import ActionsButtonsCell from "../../components/ActionsButtonsCell";
import HoverTextCell from "../../components/HoverTextCell";

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
      return <HoverTextCell text={row.getValue("message")} />;
    },
  }),
  columnHelper.accessor("actions", {
    header: "Actions",
    cell: ({ row }) => <ActionsButtonsCell row={row} />,
  }),
];
