import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTeamMember } from "../../api/apiDeletemember";

export function useDeleteTeamMember() {
  const queryClient = useQueryClient();

  const { mutate: deleteTeamMembers, isPending: isDeleting } = useMutation({
    mutationFn: ({ teamOfferId, memberId }) => {
      if (!teamOfferId || !memberId) {
        throw new Error("Both teamOfferId and memberId are required");
      }
      return deleteTeamMember(teamOfferId, memberId);
    },
    onSuccess: (_, { teamOfferId }) => {
      queryClient.invalidateQueries(["team", teamOfferId]);
      toast.success("Member removed successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to remove member");
    },
  });

  return { deleteTeamMembers, isDeleting };
}
