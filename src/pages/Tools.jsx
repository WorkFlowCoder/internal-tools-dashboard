import { Plus } from "lucide-react";
import { useState } from "react";
import ToolsCards from "../components/ToolsCards";
import ToolModal from "../components/ToolModal";
import { useTools } from "../hooks/useTools";
import { useToolActions } from "../hooks/useToolActions";

export default function Tools() {
  const { tools, setTools, loading } = useTools();
  
  const [search, setSearch] = useState("");
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [filterDept, setFilterDept] = useState("All");
  const [filterCat, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const { createTool , updateTool, deleteTool } = useToolActions();

  const handleCreate = async (newToolData) => {
    const newTool = {
      ...newToolData,
      updated_at: new Date().toISOString(),
    };
    try {
      const savedTool = await createTool(newTool);
      setTools((prev) => [savedTool, ...prev]);
      setIsModalCreateOpen(false);
    } catch (err) {
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet outil ?")) {
      try {
        await deleteTool(id);
        setTools((prev) => prev.filter((t) => t.id !== id));
      } catch (err) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  const editTool = async (updatedTool) => {
    setTools(tools.map(t => t.id === updatedTool.id ? updatedTool : t));
    try {
      const savedTool = await updateTool(updatedTool.id, updatedTool);
      setTools(prevTools => 
        prevTools.map(t => t.id === savedTool.id ? savedTool : t)
      );
    } catch (err) {
      console.log(err);
      alert("Erreur lors de la mise à jour de l'outil.");
    }
  };

  const categories= ["Communication","Design","Development","Productivity","Project Management",
    "Sales & Marketing","Security","HR","Finance","Analytics"];
  const departements = ["Marketing","Operations","Engineering","Communication","Design"]
  
  // Logique de filtrage globale
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name?.toLowerCase().includes(search.toLowerCase());
    const matchesDept = filterDept === "All" || tool.owner_department === filterDept;
    const matchesStatus = filterStatus === "All" || tool.status?.toLowerCase() === filterStatus.toLowerCase();
    const matchesCat = filterCat === "All" || tool.category?.toLowerCase() === filterCat.toLowerCase();
    return matchesSearch && matchesDept && matchesStatus && matchesCat;
  });

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tools Directory</h1>
        
        <button onClick={() => setIsModalCreateOpen(true)}
          className="group w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white hover:bg-indigo-700 active:scale-95 px-4 py-2 transition-all shadow-sm">
          <Plus 
            size={20} 
            strokeWidth={2.5} 
            className="group-hover:rotate-90 transition-transform duration-300" 
          />
          <span className="font-semibold">Ajouter un tool</span>
        </button>
      </div>
      <ToolModal
        title={"Creation d'un tool"}
        isOpen={isModalCreateOpen}
        tool={{}}
        onClose={() => setIsModalCreateOpen(false)}
        onSave={handleCreate}
      />
      {/* Barre de Recherche et Filtres */}
      <div className="flex flex-col gap-3 my-6">
         <input 
           className="border border-gray-200 p-2 rounded-xl flex-1 text-sm"
           placeholder="Rechercher..."
           onChange={(e) => setSearch(e.target.value)}
         />
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
           {/* Filtre Departement */}
           <select onChange={(e) => setFilterDept(e.target.value)} className="border border-gray-200 p-2 rounded-xl text-sm">
              <option value="All">Tous les départements</option>
              {departements.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
           </select>

           {/* Filtre Statut */}
            <select onChange={(e) => setFilterStatus(e.target.value)} className="border border-gray-200 p-2 rounded-xl text-sm">
              <option value="All">Tous les statuts</option>
              <option value="active"> active</option>
              <option value="expiring"> expiring</option>
              <option value="unused"> unused</option>
            </select>

           {/* Filtre category */}
            <select onChange={(e) => setFilterCategory(e.target.value)} className="border border-gray-200 p-2 rounded-xl text-sm">
              <option value="All">Tous les catégories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
         </div>
      </div>

      {/* 3. Ton composant Grille à qui on donne la liste filtrée */}
      <ToolsCards tools={filteredTools} editTool={editTool} deleteTool={handleDelete} />
    </div>
  );
}
