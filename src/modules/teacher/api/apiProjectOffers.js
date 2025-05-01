import { axiosPrivate } from "@/api/axios";

export async function getProjectOffers() {
  try {
    const response = await axiosPrivate.get("/projectsOffers");
    return response.data.data;
  } catch (error) {
    console.error("error while getting project offers :", error);
    throw error;
  }
}

export async function getProjectOffersHistory() {
  try {
    const response = await axiosPrivate.get("/projectsOffers/history");
    return response.data.data.offers;
  } catch (error) {
    console.error("error while getting project offers history:", error);
    throw error;
  }
}

export async function getProjectOfferbyId(id) {
  try {
    const response = await axiosPrivate.get(`/projectsOffers/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("error while getting project offer by id :", error);
    throw error;
  }
}

export async function getMyProjectOffers() {
  try {
    const response = await axiosPrivate.get("/projectsOffers/myProjectOffer");
    return response.data.data;
  } catch (error) {
    console.error("error while getting my project offers:", error);
    throw error;
  }
}
