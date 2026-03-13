import { useState } from "react";
import { Calendar, ChevronRight, ChevronLeft, Edit3, Trash2 } from "lucide-react";
import ToolModal from './ToolModal';
import ToolImg from "./ToolImg";

export default function ToolsGrid({tools,editTool,deleteTool,sortToolsDept,sortToolName}) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  // Initialisation de la pagination
  const maxItem = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDept, setSortDept] = useState({ key: null, direction: 'desc' });
  const [sortName, setSortName] = useState({ key: null, direction: 'desc' });

  const requestSortDept = (key) => {
    const newDirection = sortDept.direction === 'asc' ? 'desc' : 'asc';    
    setSortDept({ key, direction: newDirection });
    sortToolsDept(newDirection);
  };

  const requestSortName = (key) => {
    const newDirection = sortName.direction === 'asc' ? 'desc' : 'asc';    
    setSortName({ key, direction: newDirection });
    sortToolName(newDirection);
  };

  const handleDelete = (id) => {
    deleteTool(id);
  };

  const handleSave = (updatedTool) => {
    editTool(updatedTool);
    setIsModalOpen(false);
  };

  const statusStyles = {
    active:  "bg-gradient-to-r from-emerald-400 to-emerald-600",
    unused:  "bg-gradient-to-r from-pink-500 to-rose-500",
    expiring: "bg-gradient-to-r from-orange-500 to-red-500",
  };

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


      <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_100px_80px] gap-x-4 pb-4 text-sm font-semibold text-gray-400 border-b border-gray-50 mb-4 px-2">
        <div className="cursor-pointer hover:text-gray-900 transition-colors flex items-center gap-1"
          onClick={() => requestSortName('name')}>
          Name</div>
        <div className="cursor-pointer hover:text-gray-900 transition-colors flex items-center gap-1"
          onClick={() => requestSortDept('owner_department')}>
          Departments
        </div>
        <div>Users</div>
        <div>Monthly Cost</div>
        <div>Status</div>
        <div>Actions</div>
      </div>

      {/* 2. La ligne d'outil */}
      <div className="space-y-1">
        {currentTools.map((tool) => (
          <div 
            key={tool.id} 
            onClick={() => setSelectedRow(tool.id)}
            className={`grid items-center p-2 rounded-xl transition-all duration-200 cursor-pointer
            /* Grille : Status (100px) et Actions (80px) sont verrouillés */
            grid-cols-[2fr_1fr_1fr_1fr_100px_80px] gap-x-4
            ${selectedRow === tool.id ? "bg-gray-200" : "hover:bg-gray-100"} group`}
          >
            {/* Infos classiques avec truncate pour protéger l'espace */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                <ToolImg tool={tool} className="w-8 h-8 object-contain" />
              </div>
              <span className="font-bold truncate text-gray-900 text-sm">{tool.name ?? "Inconnu"}</span>
            </div>

            <div className="text-sm text-gray-600 truncate min-w-0">{tool.owner_department ?? "n/a"}</div>
            <div className="text-sm text-gray-600 font-medium truncate min-w-0">{tool.active_users_count ?? "n/a"}</div>
            <div className="text-sm text-gray-600 truncate min-w-0">{tool.monthly_cost ? "€"+tool.monthly_cost : "n/a"}</div>

            {/* Colonne Status : Largeur fixe, pas de mouvement */}
            <div className="flex justify-start">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] tracking-wider font-bold text-white shadow-sm shrink-0 ${statusStyles[tool.status?.toLowerCase()]}`}>
                {tool.status ? tool.status.charAt(0).toUpperCase() + tool.status.slice(1).toLowerCase() : "?"}
              </span>
            </div>

            {/* Colonne Actions : Alignée à droite, largeur fixe */}
            <div className="flex items-center justify-end min-w-[80px]">
              {selectedRow === tool.id && (
                <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedTool(tool); setIsModalOpen(true); }}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md hover:scale-110 transition-transform shrink-0"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(tool.id); }}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md hover:scale-110 transition-transform shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
          
        ))}
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
      <ToolModal 
        title={"Modifier "+selectedTool?.name}
        isOpen={isModalOpen}
        tool={selectedTool}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}