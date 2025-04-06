import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const columnHelper = createColumnHelper();

export const teamProjectColumns = [
  columnHelper.accessor("projectTitle", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Titre du Projet
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <span className="font-medium">{row.getValue("projectTitle")}</span>
  }),
  columnHelper.accessor("status", {
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge 
          variant={
            status === "accepted" ? "default" :
            status === "pending" ? "outline" :
            status === "rejected" ? "destructive" : "secondary"
          }
        >
          {status === "accepted" ? "Accepté" :
           status === "pending" ? "En attente" :
           status === "rejected" ? "Rejeté" : status}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("remainingMembers", {
    header: "Membres Restants",
    cell: ({ row }) => {
      const remaining = row.getValue("remainingMembers");
      return (
        <div className="flex items-center">
          <span>{remaining}</span>
          <span className="ml-1 text-sm text-muted-foreground">
            {remaining > 1 ? "places disponibles" : "place disponible"}
          </span>
        </div>
      );
    },
  }),
];