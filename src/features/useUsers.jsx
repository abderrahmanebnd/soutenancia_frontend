// features/useUsers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/apiUsers";
import { toast } from "react-hot-toast";

// features/useUsers.ts
export function useUser() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: isGettingUser,
    isError: isErrorGettingUser,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: userApi.getCurrentUser,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch user data");
    },
  });

  const updateUser = useMutation({
    mutationFn: async (userData) => {
      // Transform data for API
      const payload = {
        ...userData,
        year: userData.year ? parseInt(userData.year) : null,
        specialityId: userData.speciality || null // Using specialityId to match backend
      };
      return userApi.updateCurrentUser(payload);
    },
    onSuccess: (updatedUser) => {
      // Update query cache with the returned user data
      queryClient.setQueryData(['currentUser'], updatedUser);
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  });

  return {
    user,
    isGettingUser,
    isErrorGettingUser,
    updateUser: updateUser.mutate,
    isUpdating: updateUser.isPending,
  };
}