import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import HeaderCellWithSorting from "../../components/HeaderCellWithSorting";
import { CheckCircle2, Clock, XCircle, HelpCircle, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"; 
import { useMyProjectApplications } from "./usemyprojectapplication";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";

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
      <p className="font-semibold">{getValue()}</p>
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
    size: 150,
    enableSorting: true
  }),

  columnHelper.accessor(row => row.projectOffer?.teacher?.user?.email || 'N/A', {
    id: "teacherEmail",
    header: "Teacher Email",
    cell: ({ getValue }) => (
      <p className="text-sm text-gray-600">{getValue()}</p>
    ),
    size: 200
  }),

  columnHelper.accessor(row => row.projectOffer?.tools || [], {
    id: "tools",
    header: "Tools",
    cell: ({ getValue }) => {
      const tools = getValue();
      return tools.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {tools.map((tool, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tool}
            </Badge>
          ))}
        </div>
      ) : (
        <span className="text-xs text-gray-400">No tools specified</span>
      );
    },
    size: 200
  }),

  columnHelper.accessor(row => row.projectOffer?.languages || [], {
    id: "languages",
    header: "Languages",
    cell: ({ getValue }) => {
      const languages = getValue();
      return languages.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {languages.map((lang, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {lang}
            </Badge>
          ))}
        </div>
      ) : (
        <span className="text-xs text-gray-400">No languages specified</span>
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
      const { currentUser } = useAuth();
      const isLeader = currentUser?.user?.Student?.isLeader;
      if (!isLeader) return null;
  
      const application = row.original;
      const { 
        cancelApplication, 
        applyToProject, 
        isCanceling, 
        isApplying 
      } = useMyProjectApplications();
  
      if (application.status === "accepted") {
        return null;
      }
  
      const handleCancel = async () => {
        if (!application?.id) return;
        
        if (confirm("Do you really want to cancel this application?")) {
          try {
            await cancelApplication(application.id);
            table.options.meta?.refreshData?.();
          } catch (error) {
            console.error("Failed to cancel application:", error);
            alert(error.message || "Failed to cancel application");
          }
        }
      };
  
      const handleApply = () => {
        const projectOfferId = application?.projectOffer?.id;
        const teamOfferId = application?.teamOfferId || application?.teamOffer?.id;
        const message = application?.message || "";
      
        if (!projectOfferId || !teamOfferId) {
          console.error("Missing required IDs:", { projectOfferId, teamOfferId });
          alert("Project and Team information is required to apply.");
          return;
        }
      
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
    size: 120
  })
];