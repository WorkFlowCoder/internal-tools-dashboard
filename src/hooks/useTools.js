import { useState, useEffect } from "react";
import { api } from "../services/api";

export const useTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cherche tous les outils et gère les états de chargement et d'erreur
  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getTools();
        setTools(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTools();
  }, []);
  return { tools, setTools, loading, error };
};
