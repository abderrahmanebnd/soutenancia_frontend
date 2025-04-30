import { signupUser } from "@/api/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSignup() {
  const queryClient = useQueryClient();
  const {
    mutate: signup,
    isPending: isAddingUser,
    isSuccess: isSuccessSignup,
  } = useMutation({
    mutationFn: (data) => signupUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["teachers"]);
      toast.success("Account created successfully");
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
      toast.error("Sign up failed");
    },
  });

  return { signup, isAddingUser, isSuccessSignup };
}
