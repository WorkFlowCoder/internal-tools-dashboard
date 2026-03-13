const API_BASE_URL = "https://tt-jsonserver-01.alt-tools.tech";

export const api = {
  getTools: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tools`);
      if (!response.ok) throw new Error("Erreur lors du chargement des outils");
      return await response.json();
    } catch (error) {
      console.error("API Error - getTools:", error);
      throw error;
    }
  },

  getTool: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tools?id=${id}`);
      if (!response.ok) throw new Error("Outil non trouvé");
      return await response.json();
    } catch (error) {
      console.error("API Error - getTool:", error);
      throw error;
    }
  },

  createTool: async (toolData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tools`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toolData),
      });
      if (!response.ok) throw new Error("Erreur lors de la création");
      return await response.json();
    } catch (error) {
      console.error("API Error - createTool:", error);
      throw error;
    }
  },

  updateTool: async (id, toolData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tools/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toolData),
      });
      if (!response.ok) throw new Error("Erreur lors de la modification");
      return await response.json();
    } catch (error) {
      console.error("API Error - updateTool:", error);
      throw error;
    }
  },

  deleteTool: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tools/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression");
      return await response.json();
    } catch (error) {
      console.error("API Error - deleteTool:", error);
      throw error;
    }
  },
};
