
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import KPICard from "../components/KPICard";
import { useTools } from "../hooks/useTools";

export default function Analytics() {
  const { tools, loading } = useTools();

  // --- CALCULS ---
  const totalCost = tools.reduce((acc, tool) => acc + (Number(tool.monthly_cost) || 0), 0) || 0;
  const prevTotalCost = tools.reduce((acc, tool) => acc + (Number(tool.previous_month_cost) || 0), 0) || 0;
  const totalUsers = tools.reduce((acc, tool) => acc + (Number(tool.active_users_count) || 0), 0) || 0;
  
  const costDiff = prevTotalCost > 0 ? (totalCost - prevTotalCost) : totalCost;
  const percentageDiff = prevTotalCost > 0 ? ((costDiff / prevTotalCost) * 100).toFixed(1) : 0;
  const costPerUser = totalUsers > 0 ? Number((totalCost / totalUsers).toFixed(2)) : 0;

  // 1. Évolution du budget (Option 3 - Réaliste avec variation)
  const budgetEvolutionData = [
    { month: "Sept", budget: Math.round(Math.max(prevTotalCost * 0.70, 0)) },
    { month: "Oct", budget: Math.round(Math.max(prevTotalCost * 0.76, 0)) },
    { month: "Nov", budget: Math.round(Math.max(prevTotalCost * 0.84, 0)) },
    { month: "Dec", budget: Math.round(Math.max(prevTotalCost * 0.92, 0)) },
    { month: "Jan", budget: Math.round(Math.max(prevTotalCost, 0)) },
    { month: "Feb", budget: Math.round(Math.max(totalCost, 0)) },
  ];

  // 2. Dépenses par département (Pie)
  const deptData = Object.entries(
    tools.reduce((acc, tool) => {
      let deptName = tool.owner_department 
        ? tool.owner_department.trim().charAt(0).toUpperCase() + tool.owner_department.slice(1).toLowerCase()
        : "Autre";
      const cost = Number(tool.monthly_cost) || 0;
      acc[deptName] = (acc[deptName] || 0) + cost;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }))
  .sort((a, b) => b.value - a.value);

  // 3. Top 5 outils les plus chers (Bar)
  const topToolsData = [...tools]
    .sort((a, b) => b.monthly_cost - a.monthly_cost)
    .slice(0, 5)
    .map(t => ({ name: t.name, cost: t.monthly_cost }));

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"];

  // Palette gradients pour le pie chart
  const PIE_COLORS = [
    "#059669", // emerald-600
    "#10b981", // emerald-500
    "#3b82f6", // blue-500
    "#6366f1", // indigo-500
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
    "#f59e0b", // amber-500
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-500">Vue d'ensemble des dépenses et de l'engagement</p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Budget Total" 
          value={`€${isNaN(totalCost) ? 0 : totalCost.toLocaleString()}`} 
          icon={Wallet}
          color="bg-gradient-to-r from-emerald-400 to-emerald-600" 
        />
        <KPICard 
          title="Utilisateurs Actifs" 
          value={isNaN(totalUsers) ? 0 : totalUsers.toLocaleString()} 
          icon={Users}
          color="bg-gradient-to-r from-blue-500 to-purple-500" 
        />
        <KPICard 
          title="Évolution Budget" 
          value={`€${isNaN(costDiff) ? 0 : Math.abs(costDiff).toLocaleString()}`} 
          icon={TrendingUp}
          color="bg-gradient-to-r from-orange-500 to-red-500" 
        />
        <KPICard 
          title="Coût par Utilisateur" 
          value={`€${isNaN(costPerUser) ? 0 : Number(costPerUser).toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} 
          icon={Wallet}
          color="bg-gradient-to-r from-pink-500 to-rose-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LINE CHART - Budget Evolution */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Évolution du Budget</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={budgetEvolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                formatter={(value) => `€${value.toLocaleString()}`}
              />
              <Line 
                type="monotone" 
                dataKey="budget" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 5 }}
                activeDot={{ r: 7 }}
                name="Budget Mensuel"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART*/}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Répartition par Département</h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deptData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" label={false}>
                  {deptData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* légende */}
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
            {deptData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }} />
                <div className="flex justify-between w-full text-xs">
                  <span className="text-gray-500 truncate">{entry.name}</span>
                  <span className="font-bold text-gray-900 ml-2">
                    {((entry.value / totalCost) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BAR CHART - Top 5 Tools */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Top 5 Outils les Plus Chers</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topToolsData} layout="vertical" margin={{ top: 5, right: 30, left: window.innerWidth < 768 ? 80 : 200, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" stroke="#9ca3af" />
            <YAxis dataKey="name" type="category" stroke="#9ca3af" width={window.innerWidth < 768 ? 75 : 190} />
            <Tooltip 
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
              formatter={(value) => `€${value.toLocaleString()}`}
            />
            <Bar dataKey="cost" fill="#ec4899" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}