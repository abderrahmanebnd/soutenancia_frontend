// features/useUsers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/apiUsers";
import { toast } from "react-hot-toast";

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
      // Transform speciality data if needed
      const dataToSend = {
        ...userData,
        speciality: userData.speciality || null, // Ensure null instead of empty string
        year: userData.year ? parseInt(userData.year) : null
      };
      return userApi.updateCurrentUser(dataToSend);
    },
    onSuccess: (updatedUser) => {
      // Deep merge with existing data to preserve relationships
      queryClient.setQueryData(['currentUser'], (oldData) => ({
        ...oldData,
        ...updatedUser,
        Student: {
          ...oldData?.Student,
          ...updatedUser.Student,
          speciality: updatedUser.Student?.speciality || oldData?.Student?.speciality
        }
      }));
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