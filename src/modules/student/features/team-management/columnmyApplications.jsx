import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import HeaderCellWithSorting from "../../components/HeaderCellWithSorting";
import SkillsHoverButton from "@/components/commun/SkillsHoverButton";
import { CheckCircle2, Clock, XCircle, HelpCircle } from "lucide-react";
import { format } from "date-fns";

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
        column={column}
        sortKey="title"
      />
    ),
    cell: ({ getValue }) => (
      <p className="font-medium text-gray-900 truncate max-w-[200px] hover:text-clip">
        {getValue()}
      </p>
    ),
    size: 200,
    enableSorting: true
  }),

  columnHelper.accessor("status", {
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Status"
        column={column}
        sortKey="status"
      />
    ),
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

  columnHelper.accessor(row => {
    const total = row.teamOffer?.max_members || 1;
    const membersCount = row.teamOffer?.membersCount || 0;
    return { total, membersCount, remaining: total - membersCount };
  }, {
    id: "teamProgress",
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Team Availability"
        column={column}
        sortKey="membersCount"
      />
    ),
    cell: ({ getValue }) => {
      const { total, membersCount, remaining } = getValue() || {};
      const percentage = Math.min(100, (membersCount / total) * 100);
      const isFull = remaining <= 0;
      const isAlmostFull = remaining <= Math.ceil(total * 0.25) && !isFull;
      
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
                isFull ? 'bg-destructive' : 
                isAlmostFull ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={membersCount}
              aria-valuemin={0}
              aria-valuemax={total}
            />
          </div>
          
          {isFull ? (
            <p className="text-xs text-destructive font-medium flex items-center gap-1">
              <XCircle className="h-3 w-3" />
              Team at full capacity
            </p>
          ) : isAlmostFull && (
            <p className="text-xs text-warning-foreground font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Limited availability
            </p>
          )}
        </div>
      );
    },
    filterFn: (row, _, filterValue) => {
      const value = row.getValue('teamProgress');
      if (!value) return false;
      const { remaining } = value;
      if (filterValue === undefined || filterValue === "") return true;
      return remaining >= parseInt(filterValue);
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.getValue('teamProgress')?.remaining || 0;
      const b = rowB.getValue('teamProgress')?.remaining || 0;
      return a - b;
    },
    size: 250,
    enableSorting: true
  }),

  columnHelper.accessor(row => {
    // Get specific skills (array of strings)
    const specificSkills = row.teamOffer?.specific_required_skills || [];
    // Get general skills (array of objects with name property)
    const generalSkills = row.teamOffer?.general_required_skills?.map(skill => skill.name) || [];
    // Combine both arrays
    return [...specificSkills, ...generalSkills];
  }, {
    id: "requiredSkills",
    header: "Required Skills",
    cell: ({ getValue }) => {
      const skills = getValue();
      return (
        <SkillsHoverButton 
          skillsArray={skills}
          className="max-w-[200px]"
          emptyMessage="No skills required"
        />
      );
    },
    filterFn: (row, _, filterValue) => {
      if (!filterValue?.length) return true;
      const skills = row.getValue('requiredSkills') || [];
      return filterValue.every(selectedSkill => 
        skills.includes(selectedSkill)
      );
    },
    size: 200
  }),

  columnHelper.accessor("createdAt", {
    id: "appliedDate",
    header: ({ column }) => (
      <HeaderCellWithSorting
        title="Date Applied"
        column={column}
        sortKey="createdAt"
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
  })
];