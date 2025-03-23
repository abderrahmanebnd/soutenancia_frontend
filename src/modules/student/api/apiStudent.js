import { axiosPrivate } from "@/api/axios";

export async function getTeamOffers() {
  try {
    const response = await axiosPrivate.get("/teamsOffers");
    return response.data;
  } catch (error) {
    console.error("error while getting team offers :", error);
    throw error;
  }
}
