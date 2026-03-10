import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditToolModal = ({ tool, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(tool);

  useEffect(() => {
    setFormData(tool);
  }, [tool]);

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Fenêtre */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Modifier {formData.name}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {/* NOM */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Nom de l'outil</label>
              <input 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* DÉPARTEMENT */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Département</label>
                <input 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={formData.owner_department || ''}
                  onChange={(e) => setFormData({...formData, owner_department: e.target.value})}
                />
              </div>

              {/* USERS */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Utilisateurs</label>
                <input 
                  type="number"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={formData.active_users_count || ''}
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
                  value={formData.monthly_cost || ''}
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
              onClick={() => onSave(formData)}
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

export default EditToolModal;