// src/hooks/useAssignmentModes.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAssignmentTypes,
  createAssignmentMode, 
  updateAssignmentMode, 
  deleteAssignmentMode 
} from '@/api/apiAssignmentType'; // Changed from apiAssignmentType to apiAssignmentModes

export const useAssignmentTypes = () => {
  const {
    data: assignmentModes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['assignmentModes'],
    queryFn: getAssignmentTypes,
    onError: (error) => {
      console.error("Error fetching assignment modes:", error);
    },
  });

  return { assignmentModes, isLoading, isError };
};

export const useCreateAssignmentMode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAssignmentMode,
    onSuccess: () => {
      queryClient.invalidateQueries(['assignmentModes']);
    },
  });
};

export const useUpdateAssignmentMode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => updateAssignmentMode(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['assignmentModes']);
    },
  });
};

export const useDeleteAssignmentMode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAssignmentMode,
    onSuccess: () => {
      queryClient.invalidateQueries(['assignmentModes']);
    },
  });
};