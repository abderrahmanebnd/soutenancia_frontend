import { logoutUser } from "@/api/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useLogout() {
  const navigate = useNavigate();
  const {
    mutate: logout,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      navigate("/login");
      window.location.reload();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      toast.error("cannot log out , please try again later");
    },
  });
  return { logout, isPending, isError };
}
