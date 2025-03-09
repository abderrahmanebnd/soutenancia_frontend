import React, { useState, useEffect } from "react";
import { StudentPreferences } from "@/modules/student/pages/StudentPreferences";
import { Button } from "@/components/ui/button";
import { checkAuth } from "@/api/auth"; 
import { saveSkills } from "@/api/Skills"; 
import { AuthContext } from "./modules/student/context/AuthContext";

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthentication = async () => {
    try {
      const data = await checkAuth();
      if (!data.isAuthentified) {
        setIsPopupOpen(true);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      alert("Une erreur s'est produite lors de la vérification de l'authentification.");
    }
  };

  const handleClosePopup = async (skills) => {
    if (!skills || (skills.generalSkills.length === 0 && !skills.customSkill)) {
      alert("Veuillez sélectionner au moins une compétence.");
      return;
    }
  
    setIsLoading(true);
    setIsPopupOpen(false);
    setIsAuthenticated(true);
  
    try {
      const studentId = "cm7zbgn460001gm01lirfkasw"; 
      await saveSkills({ studentId, ...skills }); 
      console.log("Compétences enregistrées avec succès !");
      alert("Compétences enregistrées avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des compétences :", error);
      alert("Une erreur s'est produite lors de l'enregistrement des compétences.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#D2EFF6]">
      <h1 className="text-3xl font-bold mb-4">Plateforme</h1>
      {isAuthenticated ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Bienvenue sur la plateforme !</h2>
          <p className="text-gray-600">Vous avez accès à toutes les fonctionnalités.</p>
        </div>
      ) : (
        <Button onClick={() => setIsPopupOpen(true)}>Se connecter</Button>
      )}
      {isPopupOpen && (
        <StudentPreferences isOpen={isPopupOpen} onClose={handleClosePopup} />
      )}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Enregistrement en cours...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
