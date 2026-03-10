import { useState, useEffect } from "react";

import { Calendar, MoreVertical } from "lucide-react";

export default function ToolsGrid() {

  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []); // Le tableau vide [] assure que l'appel ne se fait qu'UNE fois au montage
  console.log(tools)
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
          {tools.map((tool, index) => (
            <div 
              key={index} 
              className="grid grid-cols-5 gap-x-8 items-center p-2 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer"
            >
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
                <span className="font-bold truncate text-gray-900">{tool.name ? tool.name : "Inconnu"}</span>
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
                
                {/*<button className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded-md">
                    <MoreVertical size={16} />
                </button>*/}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}