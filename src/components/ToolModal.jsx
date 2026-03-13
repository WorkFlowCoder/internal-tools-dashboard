import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

const ToolModal = ({ title, tool, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(tool);
  const [errors, setErrors] = useState({});

  // labels pour les catégories et départements (pour les selects)
  const categories = ["Communication","Design","Development","Productivity","Project Management",
    "Sales & Marketing","Security","HR","Finance","Analytics"];
  const departements = ["Marketing","Operations","Engineering","Communication","Design"];

  useEffect(() => {
    setFormData(tool);
    setErrors({});
  }, [tool]);

  const handleValidateAndSave = () => {
    const newErrors = {};
    
    // Validation
    if (!formData.name?.trim()) {
      newErrors.name = "Le nom est obligatoire";
    }
    if (!formData.description?.trim()) {
      newErrors.description = "La description est obligatoire";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const finalData = {
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
      active_users_count: parseInt(formData.active_users_count) || 0,
      monthly_cost: parseFloat(formData.monthly_cost) || 0,
      status: formData.status ?? "active",
      category: formData.category ?? categories[0],
      owner_department: formData.owner_department ?? departements[0]
    };

    onSave(finalData);
    onClose();
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          
          {Object.keys(errors).length > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-2 text-sm animate-shake">
              <AlertCircle size={16} />
              Veuillez remplir les champs obligatoires (*).
            </div>
          )}

          <div className="space-y-4">
            {/* NOM */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Nom de l'outil *</label>
              <input 
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl outline-none transition-all ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'}`}
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Description *</label>
              <textarea 
                rows="3"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl outline-none transition-all resize-none ${errors.description ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'}`}
                placeholder="À quoi sert cet outil ?"
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* DEPARTEMENT */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Département</label>
                <div className="relative">
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                    value={formData.owner_department || departements[0]}
                    onChange={(e) => setFormData({...formData, owner_department: e.target.value})}>
                    {departements.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Catégorie</label>
                <div className="relative">
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                    value={formData.category || categories[0]}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* USERS & COST */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Utilisateurs</label>
                <input 
                  type="number"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.active_users_count || 0}
                  onChange={(e) => setFormData({...formData, active_users_count: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Coût Mensuel (€)</label>
                <input 
                  type="number"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.monthly_cost || 0}
                  onChange={(e) => setFormData({...formData, monthly_cost: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            {/* STATUS */}
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Statut</label>
            <div className="relative">
              <select 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer capitalize"
                value={formData.status || 'active'}
                onChange={(e) => setFormData({...formData, status: e.target.value})}>
                <option value="active">Active</option>
                <option value="unused">Unused</option>
                <option value="expiring">Expiring</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          
          {/* BUTTON */}
          <div className="flex gap-4 mt-8">
            <button onClick={onClose} className="flex-1 py-3 rounded-full text-sm font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
              Annuler
            </button>
            <button 
              onClick={handleValidateAndSave}
              className="flex-1 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-100 active:scale-95 transition-all">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolModal;