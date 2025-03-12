import { resetPassword } from "@/api/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useResetPassword() {
  const navigate = useNavigate();
  const {
    mutate: resetPwd,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (passwords) => resetPassword(passwords),
    onSuccess: () => {
      navigate("/login", { replace: true });
      toast.success("Password reset successfully , Now log in to your account");
    },
    onError: (error) => {
      console.error("Reset password failed:", error);
      toast.error("Reset password failed");
    },
  });
  return { resetPwd, isPending, isError };
}
