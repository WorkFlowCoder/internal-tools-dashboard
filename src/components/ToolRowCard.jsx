import { Link } from "react-router-dom";
import { Eye } from 'lucide-react';
import ToolImg from "./ToolImg";
import { Edit3, Trash2 } from "lucide-react";

const ToolRowCard = ({ tool, isSelected, onSelect, onEdit, onDelete, statusStyles }) => {
  return (
    <div 
      onClick={() => onSelect(tool.id)}
      className={`relative flex flex-col gap-3 p-3 rounded-xl border transition-all duration-300 cursor-pointer
      ${isSelected 
        ? "bg-gray-50 border-indigo-200 shadow-sm ring-1 ring-indigo-100" 
        : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"
      }`}
    >
      {/* Logo & Info de base */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
          <ToolImg tool={tool} className="w-8 h-8 object-contain" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <h3 className="font-bold text-gray-900 truncate text-sm">{tool.name ?? "Inconnu"}</h3>

          <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase tracking-wider w-fit">
            {tool.category ?? "n/a"}
          </span>

            <div className="flex items-center gap-1 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-tight">
                {tool.owner_department ?? "n/a"}
                </span>
            </div>
        </div>
      </div>
      
        <p className="text-xs text-gray-500 px-2 line-clamp-2" title={tool.description}>
            {tool.description || "Aucune description"}
            <br />
            <span className="text-[9px] font-medium italic">
                {tool.updated_at ? new Date(tool.updated_at).toLocaleDateString('fr-FR', {month: 'short', day: 'numeric'}) : "n/a"}
            </span>
        </p>


      {/* Métriques (Users & Cost) */}
      <div className="grid grid-cols-2 gap-3 px-3 border-t border-gray-50 pt-3">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Utilisateurs</span>
          <span className="font-semibold text-gray-700 text-xs">{tool.active_users_count ?? "n/a"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Coût</span>
          <span className="font-bold text-gray-900 text-xs">{tool.monthly_cost !== undefined ? `€${tool.monthly_cost}` : "n/a"}</span>
        </div>
      </div>

      {/* Statut & Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <span className={`px-2 py-0.5 rounded text-[9px] tracking-wider font-bold text-white shadow-sm shrink-0 ${statusStyles[tool.status?.toLowerCase()]}`}>
          {tool.status ? tool.status.charAt(0).toUpperCase() + tool.status.slice(1).toLowerCase() : "?"}
        </span>

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-3 transition-all duration-200 ${isSelected ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <button
              onClick={() => onEdit(tool)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md hover:scale-110 active:scale-90 transition-transform"
              title="Modifier">
              <Edit3 size={18} />
            </button>

            <button
              onClick={() => handleDeleteClick(tool.id)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md hover:scale-110 active:scale-90 transition-transform"
              title="Supprimer">
              <Trash2 size={18} />
            </button>
          </div>

          <Link 
            to={`/tools/${tool.id}`}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:scale-110 active:scale-90 transition-transform"
            title="Voir les détails"
            onClick={(e) => e.stopPropagation()}>
            <Eye size={18} className="transition-transform hover:scale-110" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToolRowCard;