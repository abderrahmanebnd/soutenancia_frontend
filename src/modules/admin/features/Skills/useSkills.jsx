import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
} from "../../api/apiSkills";

export function useSkills() {
  const {
    data: skills = [],
    isLoading: isGettingSkills,
    isError: isErrorGettingSkills,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
    onError: (error) => {
      console.error("Error fetching skills:", error);
    },
  });

  return {
    skills,
    isGettingSkills,
    isErrorGettingSkills,
  };
}

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries(['skills']);
    },
    onError: (error) => {
      console.error("Error creating skill:", error);
    }
  });

  return {
    ...mutation,
    isCreating: mutation.isPending,
  };
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, ...data }) => updateSkill(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['skills']);
    },
    onError: (error) => {
      console.error("Error updating skill:", error);
    }
  });

  return {
    ...mutation,
    isUpdating: mutation.isPending,
  };
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries(['skills']);
    },
    onError: (error) => {
      console.error("Error deleting skill:", error);
    }
  });

  return {
    ...mutation,
    isDeleting: mutation.isPending,
  };
};