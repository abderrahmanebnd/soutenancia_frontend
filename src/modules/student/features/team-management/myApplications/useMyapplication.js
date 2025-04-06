import { useQuery } from "@tanstack/react-query";
import { getMyApplications } from "@/modules/student/api/apiMyapplications";

export function useMyApplications() {
  return useQuery({
    queryKey: ["myApplications"],
    queryFn: getMyApplications,
    select: (data) => ({
      applications: data.applications || [],
      isInTeam: data.applications?.length > 0, // Directly compute here
      hasPending: data.applications?.some(app => app.status === "pending") || false,
      hasAccepted: data.applications?.some(app => app.status === "accepted") || false
    })
  });
}