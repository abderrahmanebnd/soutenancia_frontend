import { verifyOneTimePassword } from "@/api/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useVerifyOtp() {
  const navigate = useNavigate();
  const {
    mutate: verifyOtp,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (credentials) => verifyOneTimePassword(credentials),
    onSuccess: () => {
      navigate("/auth/reset-password", { replace: true });
    },
    onError: (error) => {
      console.error("Verify OTP failed:", error);
      toast.error("Invalid One Time Password");
    },
  });
  return { verifyOtp, isPending, isError };
}
