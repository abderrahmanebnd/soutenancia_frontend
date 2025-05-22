// features/user/useUsers.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../../api/apiuser";
import { toast } from "react-hot-toast";

export function useUsers(role, currentPage) {
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading: isGettingUsers,
    isError: isErrorGettingUsers,
  } = useQuery({
    queryKey: ["users", role, currentPage],
    queryFn: () => userApi.getUsers(role, currentPage),
    // Access the data array from response
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    },
  });

  const createUser = useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users", role]);
      toast.success(`${role} created successfully`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || `Failed to create ${role}`);
    },
  });

  const updateUser = useMutation({
    mutationFn: (userData) => {
      const { id, ...updateData } = userData;
      return userApi.updateUser(id, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users", role]);
      toast.success(`${role} updated successfully`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || `Failed to update ${role}`);
    },
  });

  const deleteUser = useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users", role]);
      toast.success(`${role} deleted successfully`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || `Failed to delete ${role}`);
    },
  });

  return {
    users,
    isGettingUsers,
    isErrorGettingUsers,
    createUser: createUser.mutate,
    isCreating: createUser.isPending,
    updateUser: updateUser.mutate,
    isUpdating: updateUser.isPending,
    deleteUser: deleteUser.mutate,
    isDeleting: deleteUser.isPending,
  };
}
