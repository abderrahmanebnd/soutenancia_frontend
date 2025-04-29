import { axiosPrivate } from "./axios";

export async function getTeams() {
  try {
    const response = await axiosPrivate.get("/teamsOffers/closedTeams");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
}
