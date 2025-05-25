import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTeamCompositions, createTeamComposition, updateTeamComposition, deleteTeamComposition,
  getProjectSelections, createProjectSelection, updateProjectSelection, deleteProjectSelection
} from "../../api/apiDurationSettings";

// Team Composition Hooks
export const useTeamCompositions = () => {
  return useQuery({
    queryKey: ['teamCompositions'],
    queryFn: getTeamCompositions,
  });
};

export const useCreateTeamComposition = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTeamComposition,
    onSuccess: () => queryClient.invalidateQueries(['teamCompositions'])
  });
  
  return {
    createTeamComposition: mutation.mutate,
    isAdding: mutation.isPending,
    ...mutation
  };
};

export const useUpdateTeamComposition = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, ...data }) => updateTeamComposition(id, data),
    onSuccess: () => queryClient.invalidateQueries(['teamCompositions'])
  });
  
  return {
    updateTeamComposition: mutation.mutate,
    isEditing: mutation.isPending,
    ...mutation
  };
};

export const useDeleteTeamComposition = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteTeamComposition,
    onSuccess: () => queryClient.invalidateQueries(['teamCompositions'])
  });
  
  return {
    deleteTeamComposition: mutation.mutate,
    isDeleting: mutation.isPending,
    ...mutation
  };
};

// Project Selection Hooks (same pattern)
export const useProjectSelections = () => {
  return useQuery({
    queryKey: ['projectSelections'],
    queryFn: getProjectSelections,
  });
};

export const useCreateProjectSelection = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProjectSelection,
    onSuccess: () => queryClient.invalidateQueries(['projectSelections'])
  });
  
  return {
    createProjectSelection: mutation.mutate,
    isAdding: mutation.isPending,
    ...mutation
  };
};

export const useUpdateProjectSelection = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, ...data }) => updateProjectSelection(id, data),
    onSuccess: () => queryClient.invalidateQueries(['projectSelections'])
  });
  
  return {
    updateProjectSelection: mutation.mutate,
    isEditing: mutation.isPending,
    ...mutation
  };
};

export const useDeleteProjectSelection = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteProjectSelection,
    onSuccess: () => queryClient.invalidateQueries(['projectSelections'])
  });
  
  return {
    deleteProjectSelection: mutation.mutate,
    isDeleting: mutation.isPending,
    ...mutation
  };
};