// src/hooks/useSpecialities.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getSpecialities,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty
} from "@/api/apiSpecialities";

export function useSpecialities() {
  const {
    data: specialities = [],
    isLoading: isGettingSpecialities,
    isError: isErrorGettingSpecialities,
  } = useQuery({
    queryKey: ["specialities"],
    queryFn: getSpecialities,
    onError: (error) => {
      console.error("Error fetching specialities:", error);
    },
  });

  return {
    specialities,
    isGettingSpecialities,
    isErrorGettingSpecialities,
  };
}

export const useCreateSpecialty = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createSpecialty,
    onSuccess: () => {
      queryClient.invalidateQueries(['specialities']);
    },
    onError: (error) => {
      console.error("Error creating specialty:", error);
    }
  });

  return {
    ...mutation,
    isCreating: mutation.isPending,
  };
};

export const useUpdateSpecialty = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, ...data }) => updateSpecialty(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['specialities']);
    },
    onError: (error) => {
      console.error("Error updating specialty:", error);
    }
  });

  return {
    ...mutation,
    isUpdating: mutation.isPending,
  };
};

export const useDeleteSpecialty = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteSpecialty,
    onSuccess: () => {
      queryClient.invalidateQueries(['specialities']);
    },
    onError: (error) => {
      console.error("Error deleting specialty:", error);
    }
  });

  return {
    ...mutation,
    isDeleting: mutation.isPending,
  };
};