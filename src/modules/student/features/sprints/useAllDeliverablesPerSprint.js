import { useQuery } from "@tanstack/react-query";
import { getAllDeliverablesBySprint } from "../../api/apiDeliverables";

export function useAllDeliverablesPerSprint(sprintId) {
  const {
    data: allDeliverablesData,
    isLoading: isGettingAllDeliverables,
    isError: isErrorGettingAllDeliverables,
  } = useQuery({
    queryKey: ["allDeliverablesBySprint", sprintId],
    queryFn: () => getAllDeliverablesBySprint(sprintId),
    onError: (error) => {
      console.error("Error fetching all deliverables per sprint:", error);
    },
  });

  return {
    allDeliverablesData,
    isGettingAllDeliverables,
    isErrorGettingAllDeliverables,
  };
}
