import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import ToolsCards from "../components/ToolsCards";

export default function Tools() {
  const [tools, setTools] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterCat, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://tt-jsonserver-01.alt-tools.tech/tools"); 
        const data = await response.json();
        
        setTools(data);
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

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
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tools Directory</h1>
        
        <button className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white hover:bg-indigo-700 active:scale-95 px-4 py-2 transition-all shadow-sm">
          <Plus 
            size={20} 
            strokeWidth={2.5} 
            className="group-hover:rotate-90 transition-transform duration-300" 
          />
          <span className="font-semibold">Ajouter un tool</span>
        </button>
      </div>
      {/* Barre de Recherche et Filtres */}
      <div className="flex gap-4 my-6">
         <input 
           className="border p-2 rounded-xl flex-1"
           placeholder="Rechercher..."
           onChange={(e) => setSearch(e.target.value)}
         />
         {/* Filtre Departement */}
         <select onChange={(e) => setFilterDept(e.target.value)} className="border p-2 rounded-xl">
            <option value="All">Tous les départements</option>
            {departements.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
         </select>

         {/* Filtre Statut */}
          <select onChange={(e) => setFilterStatus(e.target.value)} className="border p-2 rounded-xl">
            <option value="All">Tous les statuts</option>
            <option value="active"> active</option>
            <option value="expiring"> expiring</option>
            <option value="unused"> unused</option>
          </select>

         {/* Filtre category */}
          <select onChange={(e) => setFilterCategory(e.target.value)} className="border p-2 rounded-xl">
            <option value="All">Tous les catégories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
      </div>

      {/* 3. Ton composant Grille à qui on donne la liste filtrée */}
      <ToolsCards tools={filteredTools} />
    </div>
  );
}
