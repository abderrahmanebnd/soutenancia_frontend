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
  return useMutation({
    mutationFn: createTeamComposition,
    onSuccess: () => queryClient.invalidateQueries(['teamCompositions'])
  });
};

export const useUpdateTeamComposition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => updateTeamComposition(id, data),
    onSuccess: () => queryClient.invalidateQueries(['teamCompositions'])
  });
};

export const useDeleteTeamComposition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTeamComposition,
    onSuccess: () => queryClient.invalidateQueries(['teamCompositions'])
  });
};

// Project Selection Hooks
export const useProjectSelections = () => {
  return useQuery({
    queryKey: ['projectSelections'],
    queryFn: getProjectSelections,
  });
};

export const useCreateProjectSelection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProjectSelection,
    onSuccess: () => queryClient.invalidateQueries(['projectSelections'])
  });
};

export const useUpdateProjectSelection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => updateProjectSelection(id, data),
    onSuccess: () => queryClient.invalidateQueries(['projectSelections'])
  });
};

export const useDeleteProjectSelection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProjectSelection,
    onSuccess: () => queryClient.invalidateQueries(['projectSelections'])
  });
};