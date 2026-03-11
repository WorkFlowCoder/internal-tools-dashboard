import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tools from "./pages/Tools";
import Analytics from "./pages/Analytics";
import Navbar from "./components/Navbar";
import ToolDetail from "./pages/ToolDetail";
//import { Zap, TradingUp, Wrench, Building2, Users, Search, Moon, Bell , Settings} from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      {/* On utilise bg-gray-50 (car bg-black-50 n'existe pas par défaut en Tailwind) */}
      <div className="min-h-screen bg-gray-50 text-gray-900">
        
        {/* On affiche la Navbar */}
        <Navbar />

        {/* Le contenu des pages */}
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/:id" element={<ToolDetail />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
