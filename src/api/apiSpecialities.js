// src/api/apiSpecialities.ts
import { axiosPrivate } from "./axios";

export async function getSpecialities() {
  try {
    const response = await axiosPrivate.get("/specialities");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching specialities:", error);
    throw error;
  }
}

export const createSpecialty = async (specialtyData) => {
  try {
    const response = await axiosPrivate.post('/specialities', specialtyData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating specialty:", error);
    throw error;
  }
};

export const updateSpecialty = async (id, specialtyData) => {
  try {
    const response = await axiosPrivate.patch(`/specialities/${id}`, specialtyData);
    return response.data.data;
  } catch (error) {
    console.error("Error updating specialty:", error);
    throw error;
  }
};

export const deleteSpecialty = async (id) => {
  try {
    await axiosPrivate.delete(`/specialities/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting specialty:", error);
    throw error;
  }
};