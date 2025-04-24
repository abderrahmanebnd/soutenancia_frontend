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

export async function editProjectOffer(id, data) {
  try {
    const response = await axiosPrivate.patch(`/projectsOffers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error while editing project offer:", error);
    throw error;
  }
}

export default addProjectOffer;