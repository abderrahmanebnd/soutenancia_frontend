import SectionTitle from "@/modules/student/components/SectionTitle";
import { DataTable } from "@/components/commun/data-table";
import { SkillsForm } from "../features/Skills/SkillsForm";
import { skillColumns } from "../features/Skills/skillscolumns";
import { 
  useSkills, 
  useCreateSkill, 
  useUpdateSkill, 
  useDeleteSkill 
} from "../features/Skills/useSkills";
import InlineSpinner from "@/components/commun/InlineSpinner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ManageSkills() {
  const { skills, isGettingSkills, isErrorGettingSkills } = useSkills();
  const { mutate: createSkill, isCreating } = useCreateSkill();
  const { mutate: updateSkill, isUpdating } = useUpdateSkill();
  const { mutate: deleteSkill, isDeleting } = useDeleteSkill();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState('');

  const parseSkill = (skillName) => {
    const match = skillName.match(/^(.+)\((.+)\)$/);
    return {
      skill: match ? match[1] : skillName,
      technology: match ? match[2] : '',
    };
  };

  const tableData = skills.map(skill => {
    const { skill: skillName, technology } = parseSkill(skill.name);
    return {
      id: skill.id,
      skill: skillName,
      technology,
      onEdit: () => {
        setEditingId(skill.id);
        setIsFormOpen(true);
      },
      onDelete: () => handleDelete(skill.id),
      isDeleting: false,
    };
  });

  const handleSubmit = (values) => {
    if (editingId) {
      updateSkill({ id: editingId, ...values }, {
        onSuccess: () => {
          resetForm();
          toast.success("Skill updated successfully");
        },
        onError: () => {
          toast.error("Failed to update skill");
        }
      });
    } else {
      createSkill(values, {
        onSuccess: () => {
          resetForm();
          toast.success("Skill created successfully");
        },
        onError: () => {
          toast.error("Failed to create skill");
        }
      });
    }
  };

  const handleDelete = (id) => {
    deleteSkill(id, {
      onSuccess: () => {
        toast.success("Skill deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete skill");
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
          title="Manage Skills"
          subtitle="Browse and manage all available skills"
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
              Add Skill <CirclePlus className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </section>

      <div className="bg-section p-4 rounded-xl shadow-sm">
        {isGettingSkills && <InlineSpinner />}
        {isErrorGettingSkills && (
          <p className="text-destructive">Error loading skills</p>
        )}
        {!isErrorGettingSkills && !isGettingSkills && (
          <DataTable
            columns={skillColumns}
            data={tableData}
            searchWith="skill"
            emptyMessage="No skills found"
          />
        )}
      </div>

      <SkillsForm
        open={isFormOpen}
        onClose={resetForm}
        initialData={
          editingId 
            ? parseSkill(skills.find((s) => s.id === editingId)?.name || '')
            : { skill: '', technology: '' }
        }
        onSubmit={handleSubmit}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
}