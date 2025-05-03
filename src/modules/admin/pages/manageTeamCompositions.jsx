import { useState } from "react";
import { DataTable } from "@/components/commun/data-table";
import { DurationForm } from "../features/DurationSettings/DurationSettingsForm";
import { teamCompositionColumns } from "../features/DurationSettings/TeamCompositionColumns";
import { 
  useTeamCompositions,
  useCreateTeamComposition,
  useUpdateTeamComposition,
  useDeleteTeamComposition
} from "../features/DurationSettings/useDurationSettings";
import { useSpecialities } from "@/features/specialities/useSpecialities";
import { toast } from "react-hot-toast";
import SectionTitle from "@/modules/student/components/SectionTitle";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import InlineSpinner from "@/components/commun/InlineSpinner";

export const ManageTeamCompositions = () => {
  // Use the hooks directly
  const { data: durations = [], isLoading, isError } = useTeamCompositions();
  const { specialities } = useSpecialities();
  const createMutation = useCreateTeamComposition();
  const updateMutation = useUpdateTeamComposition();
  const deleteMutation = useDeleteTeamComposition();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const tableData = durations.map(duration => ({
    ...duration,
    specialityName: specialities.find(s => s.id === duration.specialityId)?.name || "Unknown",
    onEdit: () => {
      setEditingId(duration.id);
      setIsFormOpen(true);
    },
    onDelete: () => handleDelete(duration.id)
  }));

  const handleSubmit = (values) => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...values }, {
        onSuccess: () => {
          resetForm();
          toast.success("Team composition updated successfully");
        },
        onError: () => {
          toast.error("Failed to update team composition");
        }
      });
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          resetForm();
          toast.success("Team composition created successfully");
        },
        onError: () => {
          toast.error("Failed to create team composition");
        }
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this team composition?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Team composition deleted successfully");
        },
        onError: () => {
          toast.error("Failed to delete team composition");
        }
      });
    }
  };

  const resetForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <section className="flex gap-4 items-center justify-between bg-section rounded-xl px-3 py-4 shadow-sm">
        <SectionTitle
          title="Team Composition Durations"
          subtitle="Configure team formation periods"
        />
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2"
          disabled={createMutation.isPending || updateMutation.isPending || deleteMutation.isPending}
        >
          <CirclePlus className="h-4 w-4" />
          Add Team Composition
        </Button>
      </section>

      <div className="bg-section p-4 rounded-xl shadow-sm">
        {isLoading && <InlineSpinner />}
        {isError && <p className="text-destructive">Error loading team compositions</p>}
        {!isError && !isLoading && (
          <DataTable
            columns={teamCompositionColumns}
            data={tableData}
            searchWith="specialityName"
            emptyMessage="No team compositions found"
          />
        )}
      </div>

      <DurationForm
        open={isFormOpen}
        onClose={resetForm}
        initialData={
          editingId 
            ? durations.find(d => d.id === editingId) 
            : { specialityId: '', startDate: '', endDate: '' }
        }
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
        specialities={specialities}
        title={editingId ? "Edit Team Composition" : "Add Team Composition"}
      />
    </div>
  );
};