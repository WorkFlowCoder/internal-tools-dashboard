import { Link, NavLink } from "react-router-dom";
import { Zap, Moon, Bell, Settings as SettingsIcon, Search } from "lucide-react";

export default function Navbar() {
  const navLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/tools", label: "Tools" },
    { to: "/analytics", label: "Analytics" },
    { to: "/settings", label: "Settings", disabled: true}, // Ajout de Settings ici
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
      
      {/* GAUCHE : Logo + Liens */}
      <div className="flex items-center gap-12"> {/* Gap augmenté ici pour décoller du logo */}
        <Link to="/" className="flex items-center gap-2">
          <Zap size={22} className="text-black fill-black" />
          <span className="font-bold text-xl tracking-tight text-black">TechCorp</span>
        </Link>

        {/* Navigation : Gap augmenté à 8 pour aérer les liens */}
        <div className="flex items-center gap-8"> 
          {navLinks.map((link) => (
            link.disabled ? (
                <span key={link.label} className="text-sm font-medium text-gray-300 cursor-not-allowed">
                {link.label}
                </span>
            ) : (
                <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `
                    text-sm font-medium transition-colors
                    ${isActive ? "text-black" : "text-gray-500 hover:text-black"}
                `}
                >
                {link.label}
                </NavLink>
            )
            ))}
        </div>
      </div>

      {/* DROITE : Search + Actions + Avatar */}
      <div className="flex items-center gap-3">
        <div className="relative group mr-2">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-48 bg-gray-50 border border-gray-200 rounded-lg py-1.5 pl-9 pr-3 text-sm outline-none focus:bg-white focus:border-black transition-all"
          />
        </div>

        <div className="flex items-center gap-1 text-gray-500 border-l pl-3 border-gray-100">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Moon size={19} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={19} />
          </button>
          {/* L'icône settings reste ici en tant qu'action rapide à droite */}
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <SettingsIcon size={19} />
          </button>
        </div>
        
        <div className="h-8 w-8 ml-1 rounded-full bg-black cursor-pointer hover:opacity-80 transition-opacity"></div>
      </div>

    </nav>
  );
}