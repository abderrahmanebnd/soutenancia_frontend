import SectionTitle from "@/modules/student/components/SectionTitle";
import { DataTable } from "@/components/commun/data-table";
import { SpecialtyForm } from "../features/Speciality/Specialityform";
import { specialtyColumns } from "../features/Speciality/SpecialityColumns";
import { 
  useSpecialities, 
  useCreateSpecialty, 
  useUpdateSpecialty, 
  useDeleteSpecialty 
} from "@/features/specialities/useSpecialities";
import InlineSpinner from "@/components/commun/InlineSpinner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ManageSpecialties() {
  const { specialities, isGettingSpecialities, isErrorGettingSpecialities } = useSpecialities();
  const { mutate: createSpecialty, isPending: isCreating } = useCreateSpecialty();
  const { mutate: updateSpecialty, isPending: isUpdating } = useUpdateSpecialty();
  const { mutate: deleteSpecialty, isPending: isDeleting } = useDeleteSpecialty();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState('');

  const tableData = specialities.map(specialty => ({
    id: specialty.id,
    name: specialty.name,
    year: specialty.year,
    onEdit: () => handleEdit(specialty),
    onDelete: () => handleDelete(specialty.id)
  }));

  const handleSubmit = (values) => {
    if (editingId) {
      updateSpecialty({ id: editingId, ...values }, {
        onSuccess: () => {
          resetForm();
          toast.success("Specialty updated successfully");
        },
        onError: () => {
          toast.error("Failed to update specialty");
        }
      });
    } else {
      createSpecialty(values, {
        onSuccess: () => {
          resetForm();
          toast.success("Specialty created successfully");
        },
        onError: () => {
          toast.error("Failed to create specialty");
        }
      });
    }
  };

  const handleEdit = (specialty) => {
    setEditingId(specialty.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this specialty?")) {
      deleteSpecialty(id, {
        onSuccess: () => {
          toast.success("Specialty deleted successfully");
        },
        onError: () => {
          toast.error("Failed to delete specialty");
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
          title="Manage Specialties"
          subtitle="Browse and manage all available specialties"
        />
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2"
          disabled={isCreating || isUpdating || isDeleting}
        >
          {isCreating ? (
            <InlineSpinner className="mr-2" />
          ) : (
            <>
              Add Specialty <CirclePlus className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </section>

      <div className="bg-section p-4 rounded-xl shadow-sm">
        {isGettingSpecialities && <InlineSpinner />}
        {isErrorGettingSpecialities && (
          <p className="text-destructive">Error loading specialties</p>
        )}
        {!isErrorGettingSpecialities && !isGettingSpecialities && (
          <DataTable
            columns={specialtyColumns}
            data={tableData}
            searchWith="name"
            emptyMessage="No specialties found"
          />
        )}
      </div>

      <SpecialtyForm
        open={isFormOpen}
        onClose={resetForm}
        initialData={
          editingId 
            ? specialities.find((s) => s.id === editingId) 
            : { name: '', year: 1 }
        }
        onSubmit={handleSubmit}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
}