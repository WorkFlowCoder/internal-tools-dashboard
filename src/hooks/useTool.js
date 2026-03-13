import { useState, useEffect } from "react";
import { api } from "../services/api";

export const useTool = (id) => {
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchTool = async () => {
      try {
        setLoading(true);
        const data = await api.getTool(id);
        setTool(data[0]); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [id]);

  return { tool, loading, error };
};