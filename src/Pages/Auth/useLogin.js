import { loginUser } from "@/api/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useNavigate } from "react-router";

export function useLogin() {
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (credentials) => loginUser(credentials),
    onSuccess: (data) => {
      console.log(data);
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
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);

      toast.error(
        "Login failed. Make sure your email and password are correct."
      );
    },
  });
  return { login, isPending, isError };
}
