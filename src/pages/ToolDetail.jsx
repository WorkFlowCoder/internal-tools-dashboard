import { useParams, useNavigate } from 'react-router-dom';
import { 
  Globe, Building2, Users, CreditCard, Clock
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ToolDetail() {
  const { id } = useParams(); // Récupère le "id" de l'URL
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);

  useEffect(() => {
    // On refait un fetch pour avoir la donnée fraîche de CET outil
    fetch(`https://tt-jsonserver-01.alt-tools.tech/tools?id=${id}`)
      .then(res => res.json())
        .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            setTool(data[0]);
        } else {
            setTool(null);
            navigate("/", { replace: true });
        }
      })
  }, [id]);

  if (!tool) return <div className="p-8">Chargement...</div>;

return (
  <div className="p-8 max-w-5xl mx-auto space-y-6">
    {/* HEADER CARD */}
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
            <img 
            src={tool.icon_url}
            alt={tool.name} 
            className="w-24 h-24 rounded-3xl shadow-inner border border-gray-50"
            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${tool.name}&background=f3f4f6&color=6366f1`; }}
          />
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-4xl font-bold text-gray-900">{tool.name}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                tool.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 
                tool.status === 'expiring' ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-gray-500'
              }`}>
                {tool.status}
              </span>
            </div>
            <p className="text-gray-500 flex items-center gap-2">
              <Building2 size={16} /> {tool.vendor} • {tool.category}
            </p>
          </div>
        </div>
        
        <a href={tool.website_url} target="_blank" rel="noreferrer" 
           className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white hover:bg-indigo-700 active:scale-95 px-4 py-2 transition-all shadow-sm">
          <Globe size={18} /> Visiter le site
        </a>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-50">
        <h3 className="text-sm font-bold uppercase text-gray-400 mb-3 ml-1">Description</h3>
        <p className="text-gray-600 text-lg leading-relaxed">
          {tool.description || "Aucune description disponible."}
        </p>
      </div>
    </div>

    {/* STATS GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Utilisateurs */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
          <Users size={20} />
        </div>
        <p className="text-sm text-gray-500 font-medium">Utilisateurs actifs</p>
        <p className="text-2xl font-bold text-gray-900">{tool.active_users_count ?? 0}</p>
      </div>

      {/* Coût Mensuel */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
          <CreditCard size={20} />
        </div>
        <p className="text-sm text-gray-500 font-medium">Coût Mensuel</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-gray-900">{tool.monthly_cost ?? 0}€</p>
        </div>
      </div>

      {/* Département */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
          <Building2 size={20} />
        </div>
        <p className="text-sm text-gray-500 font-medium">Département</p>
        <p className="text-2xl font-bold text-gray-900 truncate">{tool.owner_department}</p>
      </div>

      {/* Dates */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4">
          <Clock size={20} />
        </div>
        <p className="text-sm text-gray-500 font-medium">Dernière MAJ</p>
        <p className="text-lg font-bold text-gray-900">
          {new Date(tool.updated_at).toLocaleDateString()}
        </p>
      </div>

    </div>
  </div>
);
}