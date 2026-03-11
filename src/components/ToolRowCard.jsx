import { Link } from "react-router-dom";
import { Eye } from 'lucide-react';

const ToolRowCard = ({ tool, isSelected, onSelect, onEdit, onDelete, statusStyles }) => {
  return (
    <div 
      onClick={() => onSelect(tool.id)}
      className={`relative flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer mb-3
      ${isSelected 
        ? "bg-gray-50 border-indigo-200 shadow-sm ring-1 ring-indigo-100" 
        : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"
      }`}
    >
      {/* 1. Logo & Info de base */}
      <div className="flex items-center gap-4 flex-1 w-full">
        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
          <img 
            src={tool.icon_url}
            alt={tool.name} 
            className="w-8 h-8 object-contain"
            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${tool.name}&background=f3f4f6&color=6366f1`; }}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="font-bold text-gray-900 truncate block max-w-[200px]">{tool.name ?? "Inconnu"}</h3>

          <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
            {tool.category ?? "n/a"}
          </span>

            <div className="flex items-center gap-1 mt-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-tight">
                {tool.owner_department ?? "n/a"}
                </span>
            </div>
        </div>
      </div>
      
        <p className="text-xs text-gray-500" title={tool.description}>
            {tool.description || "Aucune description"}
            <br />
            <span className="text-[10px] font-medium italic">
                Mis à jour le {tool.updated_at ? new Date(tool.updated_at).toLocaleDateString('fr-FR') : "n/a"}
            </span>
        </p>


      {/* 2. Métriques (Users & Cost) */}
      <div className="grid grid-cols-2 gap-8 px-4 border-l border-gray-50 hidden sm:grid">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Utilisateurs</span>
          <span className="font-semibold text-gray-700">{tool.active_users_count ?? "n/a"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Coût Mensuel</span>
          <span className="font-bold text-gray-900">{tool.monthly_cost !== undefined ? `€${tool.monthly_cost}` : "n/a"}</span>
        </div>
      </div>

      {/* 3. Statut & Actions */}
      <div className="flex items-center gap-4 justify-between w-full md:w-auto">
        <span className={`px-3 py-1 rounded-full text-[10px] tracking-wider font-bold text-white shadow-sm shrink-0 ${statusStyles[tool.status?.toLowerCase()]}`}>
            {tool.status ? tool.status.charAt(0).toUpperCase() + tool.status.slice(1).toLowerCase() : "?"}
        </span>

        {/* Actions conditionnelles */}
        <div className={`flex gap-2 transition-all duration-200 ${isSelected ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}`}>
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(tool); }}
            className="p-2 rounded-lg bg-gray-900 text-white hover:bg-black transition-colors"
          >
            <span className="text-[10px] font-bold px-1">EDIT</span>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(tool.id); }}
            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
          >
            <span className="text-[10px] font-bold px-1">DELETE</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end ml-auto">
      <Link 
        to={`/tools/${tool.id}`}
        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
        title="Voir les détails">
        <Eye 
          size={20} 
          className="group-hover:scale-110 transition-transform" 
        />
      </Link>
      </div>
    </div>
  );
};

export default ToolRowCard;