import { loginUser } from "@/api/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useNavigate } from "react-router";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: login,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (credentials) => loginUser(credentials),
    onSuccess: (data) => {
      queryClient.invalidateQueries("user");
      switch (data.user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "student":
          navigate("/student");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        case "enterprise":
          navigate("/enterprise");
          break;
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);

      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast.error("Invalid email or password. Please try again.");
            break;
          default:
            toast.error(
              "An unexpected error occurred. Please try again later."
            );
            break;
        }
      } else if (error.request) {
        toast.error(
          "No response from server. Please check your network connection."
        );
      } else {
        toast.error("An error occurred. Please try again.");
      }
    },
  });
  return { login, isPending, isError };
}
