import { useState } from "react";
import { api } from "../services/api";

export const useToolActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Crée un nouvel outil et gère les états de chargement, d'erreur et de succès
  const createTool = async (toolData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      const newTool = await api.createTool(toolData);
      setSuccess(true);
      return newTool;
    } catch (err) {
      setError(err.message);
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Met à jour un outil existant et gère les états de chargement, d'erreur et de succès
  const updateTool = async (id, toolData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      const updatedTool = await api.updateTool(id, toolData);
      setSuccess(true);
      return updatedTool;
    } catch (err) {
      setError(err.message);
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Supprime un outil et gère les états de chargement, d'erreur et de succès
  const deleteTool = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      await api.deleteTool(id);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.message);
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createTool,
    updateTool,
    deleteTool,
    isLoading,
    error,
    success,
  };
};
