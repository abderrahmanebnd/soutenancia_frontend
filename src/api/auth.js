// src/api/auth.js
import { axiosPrivate } from "./axios";

export const checkAuth = async () => {
  try {
    const response = await axiosPrivate.get("/check-auth");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la vérification de l'authentification :", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosPrivate.post("/auth/login", credentials);
    return response.data.data; // Adaptez en fonction de la structure de votre API
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosPrivate.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    throw error;
  }
};