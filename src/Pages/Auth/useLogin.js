import { loginUser } from "@/api/apiLogin";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useLogin() {
  const { navigate } = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: (credentials) => loginUser(credentials),
    onSuccess: (data) => {
      console.log(data);
      switch (data.role) {
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
      /* TODO:show the toast when error occurs */
    },
  });
  return { login, isLoading };
}
