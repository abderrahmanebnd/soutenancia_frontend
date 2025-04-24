import { axiosPrivate } from "@/api/axios";

const addProjectOffer = async (data) => {
  try {
    const response = await axiosPrivate.post("/projectsOffers", data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to submit project offer";
    throw new Error(errorMessage);
  }
};

export default addProjectOffer;