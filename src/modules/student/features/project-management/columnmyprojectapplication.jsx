import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import HeaderCellWithSorting from "../../components/HeaderCellWithSorting";
import { CheckCircle2, Clock, XCircle, HelpCircle, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { usemyprojectapplication } from "./usemyprojectapplication";
import { useAuth } from "@/context/AuthContext"; 

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
  columnHelper.accessor(row => row.projectOffer?.title || 'N/A', {
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

      const percentage = Math.max(5, Math.min(100, (membersCount / total) * 100));
      
      return (
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-medium text-gray-600">
              {membersCount}/{total} Members 
            </span>
          </div>
          
          <div className="relative h-2 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`
                absolute top-0 left-0 h-full rounded-full transition-all duration-300
                ${percentage === 100 ? 'bg-red-500' : 
                  percentage >= 75 ? 'bg-yellow-500' : 'bg-green-500'}
              `}
              style={{ 
                width: `${percentage}%`,
                minWidth: '8px'
              }}
              role="progressbar"
              aria-valuenow={membersCount}
              aria-valuemin={0}
              aria-valuemax={total}
            />
          </div>
          
          {percentage === 100 ? (
            <p className="text-xs text-red-600 font-medium flex items-center gap-1">
              <XCircle className="h-3 w-3" />
              Team at full capacity
            </p>
          ) : percentage >= 75 ? (
            <p className="text-xs text-yellow-600 font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Limited availability ({remaining} spot{remaining !== 1 ? 's' : ''} left)
            </p>
          ) : (
            <p className="text-xs text-green-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {remaining} spot{remaining !== 1 ? 's' : ''} available
            </p>
          )}
        </div>
      );
    },
    size: 250,
    enableSorting: true
  }),

  columnHelper.accessor(row => row.projectOffer, {
    id: "toolsLanguages",
    header: "Tools & Languages",
    cell: ({ getValue }) => {
      const projectData = getValue();
      if (!projectData) return <span className="text-gray-400">No project data</span>;
      
      const tools = projectData.tools || [];
      const languages = projectData.languages || [];
      
      return (
        <div className="flex flex-col gap-1 max-w-[200px]">
          {tools.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500">Tools:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {tools.map((tool, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {languages.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500">Languages:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {languages.map((lang, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {tools.length === 0 && languages.length === 0 && (
            <span className="text-xs text-gray-400">No tools or languages specified</span>
          )}
        </div>
      );
    },
    size: 250
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
      const { currentUser } = useAuth(); 
      const isLeader = currentUser?.user?.Student?.isLeader; 
      if (!isLeader) return null;

      const application = row.original;
      const { 
        updateTeamApplication, 
        joinTeamApplication, 
        isUpdating 
      } = usemyprojectapplication();

      const handleCancel = async () => {
        if (!application?.id) return;
        
        if (confirm("Do you really want to cancel this application?")) {
          try {
            await updateTeamApplication(application.id);
            table.options.meta?.refreshData?.();
          } catch (error) {
            console.error("Failed to cancel application:", error);
          }
        }
      };

      const handleJoin = async () => {
        if (!application?.projectOffer?.id || !application?.teamOffer?.id) return;

        const message = prompt("Enter your application message:", 
          application.message || "I'd like to join this team");
        
        if (message === null) return; // User cancelled

        try {
          await joinTeamApplication({
            projectId: application.projectOffer.id,
            teamOfferId: application.teamOffer.id,
            message
          });
          table.options.meta?.refreshData?.();
        } catch (error) {
          console.error("Failed to join team:", error);
          alert(error.message);
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

      if (application.status === "pending") {
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