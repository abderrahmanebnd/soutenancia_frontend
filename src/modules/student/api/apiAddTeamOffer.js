import { axiosPrivate } from "@/api/axios";

const addTeamOffer = async (data) => {
  try {
    const response = await axiosPrivate.post("/teamsOffers", data); 
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to submit offer";
    throw new Error(errorMessage);
  }
};
export default addTeamOffer;