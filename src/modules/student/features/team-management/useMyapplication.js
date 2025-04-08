import { useQuery } from "@tanstack/react-query";
import { getMyApplications } from "../../api/apiStudentApplication";

export function useMyApplications() {
  return useQuery({
    queryKey: ["myApplications"],
    queryFn: getMyApplications,
    select: (data) => ({
      applications: data.applications || [],
      isInTeam: data.applications?.length > 0,
      hasPending: data.applications?.some(app => app.status === "pending") || false,
      hasAccepted: data.applications?.some(app => app.status === "accepted") || false
    })
  });
}