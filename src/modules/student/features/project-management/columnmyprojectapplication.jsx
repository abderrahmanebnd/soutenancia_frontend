import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import HeaderCellWithSorting from "../../components/HeaderCellWithSorting";
import { Clock, Trash2, Plus, CircleCheck, CircleX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useMyProjectApplications } from "./usemyprojectapplication";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";

const columnHelper = createColumnHelper();

export const columnsMyApplications = [
  columnHelper.accessor("projectTitle", {
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Project Title"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => {
      return <p className="font-semibold">{row.original.projectTitle}</p>;
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

  columnHelper.accessor("teacherEmail", {
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Teacher Email"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => {
      return <p>{row.original.teacherEmail}</p>;
    },
  }),

  columnHelper.accessor("tools", {
    header: "Tools",
    cell: ({ row }) => {
      return (
        <>
          {row.original.tools.map((tool, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {tool}
            </Badge>
          ))}
        </>
      );
    },
  }),

  columnHelper.accessor("languages", {
    header: "Languages",
    cell: ({ row }) => {
      return (
        <>
          {row.original.languages.map((language, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {language}
            </Badge>
          ))}
        </>
      );
    },
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const { currentUser } = useAuth();
      const isLeader = currentUser?.user?.Student?.isLeader;
      if (!isLeader) return null;

      const application = row.original;
      const { cancelApplication, applyToProject, isCanceling, isApplying } =
        useMyProjectApplications();

      if (application.status === "accepted") {
        return null;
      }

      function handleCancel() {
        const projectOfferId = application.projectOfferId;
        const teamOfferId = application.teamOfferId;
        cancelApplication({ projectOfferId, teamOfferId });
      }

      const handleApply = () => {
        const projectOfferId = application.projectOfferId;
        const teamOfferId = application.teamOfferId;
        const message = "";

        applyToProject({ projectOfferId, teamOfferId, message });
      };

      if (application.status === "canceled") {
        return (
          <div className="flex justify-center">
            {isApplying ? (
              <ButtonWithSpinner
                disabled={isApplying}
                variant="outline"
                className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200 rounded-full h-6 hover:text-green-600"
              />
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200 rounded-full h-6 hover:text-green-600"
                onClick={handleApply}
                disabled={isApplying}
              >
                <Plus className="h-4 w-4 mr-2" />
                Apply
              </Button>
            )}
          </div>
        );
      }

      if (application.status === "pending") {
        return (
          <div className="flex justify-center">
            {isCanceling ? (
              <ButtonWithSpinner
                disabled={isCanceling}
                variant="outline"
                className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200 rounded-full h-6 hover:text-red-600"
              />
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200 rounded-full h-6 hover:text-red-600"
                onClick={handleCancel}
                disabled={isCanceling}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            )}
          </div>
        );
      }

      return null;
    },
    size: 120,
  }),
];
