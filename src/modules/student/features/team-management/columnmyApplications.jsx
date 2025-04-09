import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import SkillsHoverButton from "@/components/commun/SkillsHoverButton";
import HeaderCellWithSorting from "../../components/HeaderCellWithSorting";
import HoverTextCell from "../../components/HoverTextCell";
import { CheckCircle2, Clock, XCircle, HelpCircle, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useUpdateApplication } from "@/modules/student/features/team-management/useUpdateApplication";

const columnHelper = createColumnHelper();

const statusBadgeConfig = {
  pending: {
    variant: "pending",
    icon: <Clock className="mr-1 h-4 w-4" />,
    text: "Pending"
  },
  accepted: {
    variant: "success",
    icon: <CheckCircle2 className="mr-1 h-4 w-4" />,
    text: "Accepted"
  },
  rejected: {
    variant: "destructive",
    icon: <XCircle className="mr-1 h-4 w-4" />,
    text: "Rejected"
  },
  canceled: {
    variant: "destructive",
    icon: <XCircle className="mr-1 h-4 w-4" />,
    text: "Canceled"
  },
  default: {
    variant: "outline",
    icon: <HelpCircle className="mr-1 h-4 w-4" />,
    text: "Unknown"
  }
};

export const columnsMyApplications = [
  columnHelper.accessor(row => row.teamOffer?.title || 'N/A', {
    id: "projectTitle",
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Project Title"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ getValue }) => (
      <p className="font-semibold">
        {getValue()}
      </p>
    ),
    size: 200,
    enableSorting: true
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status || "default";
      const config = statusBadgeConfig[status] || statusBadgeConfig.default;
      
      return (
        <Badge variant={config.variant} className="gap-1">
          {config.icon}
          {config.text}
        </Badge>
      );
    },
    filterFn: (row, _, filterValue) => {
      if (!filterValue?.length) return true;
      return filterValue.includes(row.original.status);
    },
    size: 150,
    enableSorting: true
  }),

  columnHelper.accessor(row => row.teamOffer, {
    id: "teamProgress",
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Team Availability"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ getValue }) => {
      const teamData = getValue();
      if (!teamData) return <span className="text-gray-400">No team data</span>;
      
      const total = teamData.max_members || 1;
      const membersCount = teamData._count?.TeamMembers || 0;
      const remaining = total - membersCount;

      const percentage = Math.min(100, (membersCount / total) * 100);
      
      return (
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-medium text-gray-600">
              {membersCount}/{total} members
            </span>
          </div>
          
          <div className="relative h-2 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${
                percentage === 100 ? 'bg-destructive' : 
                percentage >= 75 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ 
                width: `${percentage}%`,
                minWidth: '0'
              }}
              role="progressbar"
              aria-valuenow={membersCount}
              aria-valuemin={0}
              aria-valuemax={total}
            />
          </div>
          
          {percentage === 100 ? (
            <p className="text-xs text-destructive font-medium flex items-center gap-1">
              <XCircle className="h-3 w-3" />
              Team at full capacity
            </p>
          ) : percentage >= 75 ? (
            <p className="text-xs text-warning-foreground font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Limited availability ({remaining} spot{remaining !== 1 ? 's' : ''} left)
            </p>
          ) : (
            <p className="text-xs text-success-foreground font-medium flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {remaining} spot{remaining !== 1 ? 's' : ''} available
            </p>
          )}
        </div>
      );
    },
    filterFn: (row, _, filterValue) => {
      const teamOffer = row.original.teamOffer;
      if (!teamOffer) return false;
      
      const total = teamOffer.max_members || 1;
      const membersCount = teamOffer._count?.TeamMembers || 0;
      const remaining = total - membersCount;
      
      if (filterValue === undefined || filterValue === "") return true;
      return remaining >= parseInt(filterValue);
    },
    sortingFn: (rowA, rowB) => {
      const getRemaining = (offer) => {
        if (!offer?.teamOffer) return 0;
        const total = offer.teamOffer.max_members || 1;
        const membersCount = offer.teamOffer._count?.TeamMembers || 0;
        return total - membersCount;
      };
      
      const a = getRemaining(rowA);
      const b = getRemaining(rowB);
      return a - b;
    },
    size: 250,
    enableSorting: true
  }),

  columnHelper.accessor(row => row.teamOffer, {
    id: "requiredSkills",
    header: "Required Skills",
    cell: ({ getValue }) => {
      const teamData = getValue();
      if (!teamData) return <span className="text-gray-400">No skills data</span>;
      
      return (
        <SkillsHoverButton 
          generalSkills={teamData.general_required_skills || []}
          customSkills={teamData.specific_required_skills || []}
          className="max-w-[200px]"
          emptyMessage="No skills required"
        />
      );
    },
    filterFn: (row, _, filterValue) => {
      if (!filterValue?.length) return true;
      
      const teamOffer = row.original.teamOffer;
      if (!teamOffer) return false;
      
      const generalSkills = teamOffer.general_required_skills?.map(s => s.name) || [];
      const specificSkills = teamOffer.specific_required_skills || [];
      const allSkills = [...generalSkills, ...specificSkills];
      
      return filterValue.every(selectedSkill => 
        allSkills.includes(selectedSkill)
      );
    },
    size: 200
  }),

  columnHelper.accessor("createdAt", {
    id: "appliedDate",
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Date Applied"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ getValue }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {format(new Date(getValue()), 'MMM dd, yyyy')}
        </span>
        <span className="text-xs text-gray-500">
          {format(new Date(getValue()), 'h:mm a')}
        </span>
      </div>
    ),
    size: 150,
    enableSorting: true
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const application = row.original;
      const { updateTeamApplication, isUpdating } = useUpdateApplication();

      const handleCancel = async () => {
        if (!application?.id) return;
        
        if (confirm("Do you really want to cancel this application?")) {
          try {
            await updateTeamApplication({ 
              idApplication: application.id,
              status: "canceled"
            });
            table.options.meta?.refreshData?.();
          } catch (error) {
            console.error("Failed to cancel application:", error);
          }
        }
      };

      const handleJoin = async () => {
        if (!application?.id) return;
        
        if (confirm("Do you want to rejoin this team?")) {
          try {
            await updateTeamApplication({ 
              idApplication: application.id,
              status: "pending"
            });
            table.options.meta?.refreshData?.();
          } catch (error) {
            console.error("Failed to join team:", error);
          }
        }
      };

      if (application.status === "canceled") {
        return (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200 rounded-full h-6 hover:text-green-600"
              onClick={handleJoin}
              disabled={isUpdating}
            >
              <Plus className="h-4 w-4 mr-2" />
              {isUpdating ? "Joining..." : "Join"}
            </Button>
          </div>
        );
      }

      if (["pending", "accepted"].includes(application.status)) {
        return (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200 rounded-full h-6 hover:text-red-600"
              onClick={handleCancel}
              disabled={isUpdating}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isUpdating ? "Canceling..." : "Cancel"}
            </Button>
          </div>
        );
      }

      return null;
    },
    size: 120
  })
];