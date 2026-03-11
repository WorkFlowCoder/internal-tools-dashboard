import KPICard from "../components/KPICard";
import ToolsGrid from "../components/ToolsGrid";
import { useState, useEffect } from "react";
import { Wrench, Users, TrendingUp, Building2 } from "lucide-react";

export default function Dashboard() {
  const [tools, setTools] = useState([]);
  const deleteTool = (id) => {
    setTools(tools.filter(tool => tool.id !== id));
  };
  const editTool = (updatedTool) => {
    setTools(tools.map(t => t.id === updatedTool.id ? updatedTool : t));
  };
  const [loading, setLoading] = useState(true);useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://tt-jsonserver-01.alt-tools.tech/tools"); 
        const data = await response.json();
        
        setTools(data);
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  return (

  <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Internal Tools Dashboard</h1>
        <p className="text-gray-500">Monitor and manage your organization's software tools and expenses</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Monthly Budget"
          value={<div>€28.750<span className="text-gray-400">/€30k</span></div>}
          icon={TrendingUp} 
          trend="+12%"
          color="bg-gradient-to-r from-emerald-400 to-emerald-600"
        />
        <KPICard 
          title="Active Tools" 
          value="147" 
          icon={Wrench}
          trend="+8"
          color="bg-gradient-to-r from-blue-500 to-purple-500"
        />
        <KPICard 
          title="Departements" 
          value="8" 
          icon={Building2} 
          trend="+2"
          color="bg-gradient-to-r from-orange-500 to-red-500"
        />
        <KPICard 
          title="Cost/user" 
          value="€156" 
          icon={Users} 
          trend="-€12"
          color="bg-gradient-to-r from-pink-500 to-rose-500"
        />
      </div>
    <ToolsGrid tools={tools} editTool={editTool} deleteTool={deleteTool}/>
    </div>
  );
}
//valueTest={`€28.750<span className="text-gray-400 font-normal">/€30k</span>}`}
