import { useState, useEffect } from "react";
import EditToolModal from './EditToolModal';
import { Calendar, ChevronRight, ChevronLeft } from "lucide-react";

export default function ToolsGrid() {

  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  // Initialisation de la pagination
  const maxItem = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id) => {
    setTools(tools.filter(tool => tool.id !== id));
  };

  const handleSave = (updatedTool) => {
    setTools(tools.map(t => t.id === updatedTool.id ? updatedTool : t));
    setIsModalOpen(false);
  };

  const statusStyles = {
    active:  "bg-gradient-to-r from-emerald-400 to-emerald-600",
    unused:  "bg-gradient-to-r from-pink-500 to-rose-500",
    expiring: "bg-gradient-to-r from-orange-500 to-red-500",
  };

  useEffect(() => {
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

  // Calcul pour la pagination
  const indexOfLastItem = currentPage * maxItem;
  const indexOfFirstItem = indexOfLastItem - maxItem;
  const currentTools = tools.slice(indexOfFirstItem, indexOfLastItem);

  // Nombre total de pages
  const totalPages = Math.ceil(tools.length / maxItem);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-8">
      {/* Header de la carte */}
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Recent Tools</h2>
        <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
            <Calendar size={14} strokeWidth={2.5} />
            <span>Last 30 days</span>
        </div>
      </div>

      {/* Grille des colonnes */}
      <div className="p-6">
        {/* En-tête de la grille */}
        <div className="grid grid-cols-5 gap-x-8 pb-4 text-sm font-semibold text-gray-400 border-b border-gray-50 mb-4 px-2">
          <div>Tools</div>
          <div>Departments</div>
          <div>Users</div>
          <div>Monthly Cost</div>
          <div>Status</div>
        </div>

        {/* Liste des outils */}
        <div className="space-y-1">
          {currentTools.map((tool, index) => (
            <div key={index} onClick={() => setSelectedRow(index)}
            className={`grid grid-cols-5 gap-x-8 items-center p-2 rounded-xl transition-all duration-200 cursor-pointer
            ${selectedRow === index ? "bg-gray-300" : "hover:bg-gray-200"} group`}>

              {/* Tool + Icon */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                <img 
                    src={tool.icon_url}
                    alt={tool.name} 
                    className="w-full h-full object-contain p-1.5"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
                </div>
                <span className="font-bold truncate text-gray-900">
                    {tool.name ? tool.name : "Inconnu"}
                </span>
              </div>

              {/* Department */}
              <div className="text-sm text-gray-600">
                {tool.owner_department ? tool.owner_department : "Inconnu"}
              </div>

              {/* Users */}
              <div className="text-sm text-gray-600 font-medium">
                {tool.active_users_count ? tool.active_users_count : "Inconnu"}
              </div>

              {/* Cost */}
              <div className="text-sm text-gray-600">
                {tool.monthly_cost ? "€"+tool.monthly_cost : "Inconnu"}
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] tracking-wider font-bold text-white ${statusStyles[tool.status?.toLowerCase()]}`}>
                    {tool.status ? tool.status.charAt(0).toUpperCase() + tool.status.slice(1).toLowerCase() : "?"}
                </span>

                {selectedRow === index && (
                    <div className="flex gap-2 ml-4">
                    <button className="px-2.5 py-0.5 rounded-full text-[10px] bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    onClick={() => {setSelectedTool(tool); setIsModalOpen(true);}}>
                        Edit
                    </button>

                    <button className="px-2.5 py-0.5 rounded-full text-[10px] bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                    onClick={() => handleDelete(tool.id)}>
                        Delete
                    </button>
                    </div>
                )}
                </div>
              </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center justify-between px-8 py-4 border-t border-gray-100 bg-white rounded-b-2xl sm:flex-row flex-col gap-4">
            <div className="flex items-center gap-8">
                
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft size={18} />
                Précédent
                </button>

                <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Page</span>
                    <span className="text-sm font-black text-gray-500">{currentPage}</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-sm font-black text-gray-500">{totalPages}</span>
                </div>

                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                Suivant
                <ChevronRight size={18} />
                </button>
                
            </div>
        </div>
      </div>
      <EditToolModal 
        isOpen={isModalOpen}
        tool={selectedTool}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}