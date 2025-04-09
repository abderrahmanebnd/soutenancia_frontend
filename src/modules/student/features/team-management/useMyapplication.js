import { useQuery } from "@tanstack/react-query";
import { getMyApplications } from "../../api/apiMyapplications";

export function useMyApplications() {
  return useQuery({
    queryKey: ["myApplications"],
    queryFn: getMyApplications,
    select: (data) => {
      const applications = data?.applications || [];
      return {
        applications,
        hasPending: applications.some(app => app.status === "pending"),
        hasAccepted: applications.some(app => app.status === "accepted"),
        activeApplications: applications.filter(app => 
          ["pending", "accepted"].includes(app.status)
        ),
        completedApplications: applications.filter(app =>
          ["rejected", "canceled"].includes(app.status)
        )
      };
    },
    retry: (failureCount, error) => {
      // Don't retry on 403 errors
      if (error.message.includes("don't have permission")) return false;
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching applications:", error);
    }
  });
}