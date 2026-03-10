export default function KPICard({title, value, icon: Icon, trend, color}) {

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        
        {Icon && (
          <div className={`p-1.5 bg-gradient-to-br rounded-xl border ${color} text-white`}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{value}</h3>
        
        {trend && (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${color} text-white`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}