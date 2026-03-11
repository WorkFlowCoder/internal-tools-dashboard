import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

const ToolModal = ({ title, tool, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(tool);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(tool);
    setErrors({});
  }, [tool]);

  const handleValidateAndSave = () => {
    if (!formData.name?.trim()) {
      setErrors({ name: "Le nom est obligatoire" });
      return;
    }
    const finalData = {
      name: formData.name,
      active_users_count: parseInt(formData.active_users_count) || 0,
      monthly_cost: parseFloat(formData.monthly_cost) || 0,
      status: formData.status ?? "active",
      category: formData.category ?? categories[0],
      owner_department: formData.owner_department ?? departements[0]
    };
    onSave(finalData);
    onClose();
  };

  const categories = ["Communication","Design","Development","Productivity","Project Management",
    "Sales & Marketing","Security","HR","Finance","Analytics"];
  const departements = ["Marketing","Operations","Engineering","Communication","Design"]

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Fenêtre */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          
          {/* Message d'erreur */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-2 text-sm animate-shake">
              <AlertCircle size={16} />
              Veuillez remplir les champs obligatoires.
            </div>
          )}

          <div className="space-y-4">
            {/* NOM */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Nom de l'outil *</label>
              <input 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* DÉPARTEMENT */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Département</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                  value={formData.owner_department}
                  onChange={(e) => setFormData({...formData, owner_department: e.target.value})}>
                  {departements?.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Catégorie</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  {categories?.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* USERS */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Utilisateurs</label>
                <input 
                  type="number"
                  min="0"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={formData.active_users_count || 0}
                  onChange={(e) => setFormData({...formData, active_users_count: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* COÛT MENSUEL */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Coût Mensuel</label>
                <input 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={formData.monthly_cost || 0}
                  min="0"
                  onChange={(e) => setFormData({...formData, monthly_cost: e.target.value})}
                />
              </div>

              {/* STATUS */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Statut</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
                  value={formData.status || 'active'}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="unused">Unused</option>
                  <option value="expiring">Expiring</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button onClick={onClose} className="flex-1 py-2 px-2.5 py-0.5 rounded-full text-[10px] bg-gradient-to-r from-pink-500 to-rose-500 text-white">
              Annuler
            </button>
            <button 
              onClick={() => handleValidateAndSave(formData)}
              className="flex-1 py-2 px-2.5 py-0.5 rounded-full text-[10px] bg-gradient-to-r from-emerald-400 to-emerald-600 text-white"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolModal;