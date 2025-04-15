import { axiosPrivate } from "@/api/axios";

export async function getTeamCompositionCountdown() {
  try {
    const response = await axiosPrivate.get("/settings/teamComposition");
    return response.data.data;
  } catch (error) {
    console.error("error while getting team composition countdown:", error);
    throw error;
  }
}
