import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "@/api/axios";
import toast from "react-hot-toast";

export function useUploadAvatar() {
  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("avatar", file);
      
      const response = await axiosPrivate.patch("/users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onError: (error) => {
      console.error("Error uploading avatar:", error);
      toast.error(error.response?.data?.message || "Failed to upload avatar");
    },
  });
}