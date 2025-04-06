import { useState } from "react";
import { DataTable } from "./DataTable";
import { teamProjectColumns } from "./columns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTeamProjectsFilters } from "./useTeamProjects";

export function TeamProjectsTable({ teamId }) {
  const [filters, setFilters] = useState({
    status: "all",
    members: "all"
  });

  const { data, isLoading, error } = useTeamProjectsFilters(teamId, filters);

  if (isLoading) return <div className="flex justify-center py-8">Chargement en cours...</div>;
  if (error) return <div className="text-red-500 py-8">Erreur: {error.message}</div>;

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Mes Projets d'Équipe</h2>
      
      <div className="flex gap-4 mb-4">
        {/* Filtre par statut */}
        <div className="w-48">
          <Select 
            value={filters.status} 
            onValueChange={value => setFilters({...filters, status: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="accepted">Accepté</SelectItem>
              <SelectItem value="rejected">Rejeté</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Filtre par membres restants */}
        <div className="w-48">
          <Select 
            value={filters.members} 
            onValueChange={value => setFilters({...filters, members: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par places" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les places</SelectItem>
              <SelectItem value="none">Complet (0 place)</SelectItem>
              <SelectItem value="few">Peu de places (1-3)</SelectItem>
              <SelectItem value="many">Beaucoup de places (3+)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <DataTable 
        columns={teamProjectColumns} 
        data={data || []} 
        searchPlaceholder="Rechercher un projet..."
        searchColumn="projectTitle"
      />
    </div>
  );
}