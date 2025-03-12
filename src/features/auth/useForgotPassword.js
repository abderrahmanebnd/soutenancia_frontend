import { forgotPassword } from "@/api/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useForgotPassword() {
  const navigate = useNavigate();
  const {
    mutate: forgotPwd,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (email) => forgotPassword(email),
    onSuccess: () => {
      navigate("/verification-code");
    },
    onError: (error) => {
      console.error("Forgot password failed:", error);
      toast.error("email not found");
    },
  });
  return { forgotPwd, isPending, isError };
}
