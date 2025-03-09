// src/api/skills.js
import { axiosPrivate } from "./axios";

export const saveSkills = async (skills) => {
  try {
    const response = await axiosPrivate.post("/save-skills", { skills });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des compétences :", error);
    throw error;
  }
};

export const fetchSkills = async () => {
  try {
    const response = await axiosPrivate.get("/skills");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des compétences :", error);
    throw error;
  }
};