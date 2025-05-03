import { useState } from "react";
import { DataTable } from "@/components/commun/data-table";
import { DurationForm } from "../features/DurationSettings/DurationSettingsForm";
import { projectSelectionColumns } from "../features/DurationSettings/ProjectSelectionColumns";
import { 
  useProjectSelections,
  useCreateProjectSelection,
  useUpdateProjectSelection,
  useDeleteProjectSelection
} from "../features/DurationSettings/useDurationSettings";
import { useSpecialities } from "@/features/specialities/useSpecialities";
import { toast } from "react-hot-toast";
import SectionTitle from "@/modules/student/components/SectionTitle";
import { CirclePlus } from "lucide-react";
import InlineSpinner from "@/components/commun/InlineSpinner";
import { Button } from "@/components/ui/button";

export const ManageProjectSelections = () => {
  const { data: durations = [], isLoading, isError } = useProjectSelections();
  const { specialities } = useSpecialities();
  const createMutation = useCreateProjectSelection();
  const updateMutation = useUpdateProjectSelection();
  const deleteMutation = useDeleteProjectSelection();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const tableData = durations.map(duration => ({
    ...duration,
    specialityName: specialities.find(s => s.id === duration.specialityId)?.name || "Unknown",
    isEditing: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    onEdit: (data) => {
      setEditingId(data.id);
      setIsFormOpen(true);
    },
    onDelete: (id) => handleDelete(id)
  }));

  const handleSubmit = (values) => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...values }, {
        onSuccess: () => {
          resetForm();
          toast.success("Project selection updated successfully");
        },
        onError: () => {
          toast.error("Failed to update project selection");
        }
      });
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          resetForm();
          toast.success("Project selection created successfully");
        },
        onError: () => {
          toast.error("Failed to create project selection");
        }
      });
    }
  };

  const handleDelete = (id) => {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Project selection deleted successfully");
        },
        onError: () => {
          toast.error("Failed to delete project selection");
        }
      });
    
  };

  const resetForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <section className="flex gap-4 items-center justify-between bg-section rounded-xl px-3 py-4 shadow-sm">
        <SectionTitle
          title="Project Selection Durations"
          subtitle="Configure project selection periods"
        />
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2"
          disabled={createMutation.isPending || updateMutation.isPending || deleteMutation.isPending}
        >
          <CirclePlus className="h-4 w-4" />
          Add Project Selection
        </Button>
      </section>

      <div className="bg-section p-4 rounded-xl shadow-sm">
        {isLoading && <InlineSpinner />}
        {isError && <p className="text-destructive">Error loading project selections</p>}
        {!isError && !isLoading && (
          <DataTable
            columns={projectSelectionColumns}
            data={tableData}
            searchWith="specialityName"
            emptyMessage="No project selections found"
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
        title={editingId ? "Edit Project Selection" : "Add Project Selection"}
      />
    </div>
  );
};