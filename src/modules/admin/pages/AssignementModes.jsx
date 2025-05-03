// src/pages/AssignmentModesPage.jsx
import SectionTitle from "@/modules/student/components/SectionTitle";
import { DataTable } from "@/components/commun/data-table";
import { AssignmentModeForm } from '../features/assignment-modes/assignmentmodesform';
import { assignmentModeColumns } from '../features/assignment-modes/assignmentModeColumns';
import { 
  useAssignmentTypes,
  useCreateAssignmentMode, 
  useUpdateAssignmentMode, 
  useDeleteAssignmentMode 
} from '@/features/assignmentType/useAssignmentTypes'; // Changed import path
import InlineSpinner from "@/components/commun/InlineSpinner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CirclePlus } from "lucide-react";

export default function AssignmentModesPage() {
  const { assignmentModes, isLoading, isError } = useAssignmentTypes();
  const createMutation = useCreateAssignmentMode();
  const updateMutation = useUpdateAssignmentMode();
  const deleteMutation = useDeleteAssignmentMode();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const tableData = assignmentModes.map(mode => ({
    id: mode.id,
    year: mode.year,
    assignmentType: mode.assignmentType,
    onEdit: () => handleEdit(mode),
    onDelete: () => handleDelete(mode.id)
  }));

  const handleSubmit = (values) => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...values }, {
        onSuccess: () => resetForm()
      });
    } else {
      createMutation.mutate(values, {
        onSuccess: () => resetForm()
      });
    }
  };

  const handleEdit = (mode) => {
    setEditingId(mode.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
      deleteMutation.mutate(id);
    
  };

  const resetForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <section className="flex gap-4 items-center justify-between bg-section rounded-xl px-3 py-4 shadow-sm">
        <SectionTitle
          title="Assignment Modes"
          subtitle="Manage different assignment modes and configurations"
        />
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2"
        >
          Add Assignment Mode <CirclePlus size={18} />
        </Button>
      </section>

      <div className="bg-section p-4 rounded-xl shadow-sm">
        {isLoading && <InlineSpinner />}
        {isError && <p className="text-destructive">Error loading assignment modes</p>}
        {!isError && !isLoading && (
          <DataTable
            columns={assignmentModeColumns}
            data={tableData}
            searchWith="assignmentType"
            emptyMessage="No assignment modes found"
          />
        )}
      </div>

      <AssignmentModeForm
        open={isFormOpen}
        onClose={resetForm}
        initialData={
          editingId 
            ? assignmentModes.find((m) => m.id === editingId) 
            : { year: 1, assignmentType: '' }
        }
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}