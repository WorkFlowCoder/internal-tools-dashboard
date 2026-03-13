import { useState } from "react";
import ToolModal from './ToolModal';
import { ChevronRight, ChevronLeft } from "lucide-react";
import ToolRowCard from "./ToolRowCard";

export default function ToolsCards({tools,editTool,deleteTool}) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  // Initialisation de la pagination
  const maxItem = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id) => {
    deleteTool(id);
  };

  const handleSave = (updatedTool) => {
    editTool(updatedTool);
    setIsModalOpen(false);
  };

  // code pour les styles de statut
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
      {/* Liste des outils */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-6">
            {currentTools.map((tool) => (
            <ToolRowCard 
                key={tool.id}
                tool={tool}
                isSelected={selectedRow === tool.id}
                onSelect={setSelectedRow}
                onEdit={(t) => { setSelectedTool(t); setIsModalOpen(true); }}
                onDelete={handleDelete}
                statusStyles={statusStyles}
            />
            ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 sm:px-8 py-4 border-t border-gray-100">
            <div className="flex items-center gap-2 sm:gap-4">
                
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 text-xs sm:text-sm font-bold text-gray-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Précédent</span>
                </button>

                <div className="flex items-center gap-2 px-2 sm:px-3 py-1 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Page</span>
                    <span className="text-xs sm:text-sm font-black text-gray-500">{currentPage}</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-xs sm:text-sm font-black text-gray-500">{totalPages}</span>
                </div>

                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 text-xs sm:text-sm font-bold text-gray-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <span className="hidden sm:inline">Suivant</span>
                <ChevronRight size={16} />
                </button>
                
            </div>
        </div>
      {/* Modal d'édition */}
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