import { Link, NavLink } from "react-router-dom";
import { Zap, Moon, Bell, ChevronDown, Settings as SettingsIcon, Search } from "lucide-react";

export default function Navbar() {
  const navLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/tools", label: "Tools" },
    { to: "/analytics", label: "Analytics" },
    { to: "/settings", label: "Settings", disabled: true},
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
      
      <div className="flex items-center gap-12">
        <Link to="/" className="flex items-center gap-2">
          <div className={`p-1.5 bg-gradient-to-br rounded-xl border bg-gradient-to-r from-blue-500 to-purple-500 text-white`}>
            <Zap size={20}/>
          </div>
          <span className="font-bold text-xl tracking-tight text-black">TechCorp</span>
        </Link>

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

      <div className="flex items-center gap-3">
        <div className="relative group mr-2">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search tools ..." 
            className="w-48 bg-gray-50 border border-gray-200 rounded-lg py-1.5 pl-9 pr-3 text-sm outline-none focus:bg-white focus:border-black transition-all"
          />
        </div>

        <div className="flex items-center gap-1 text-gray-500 border-l pl-3 border-gray-100">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Moon size={19} />
          </button>
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group">
            <Bell size={19} className="text-gray-600 group-hover:text-gray-900" />
            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <SettingsIcon size={19} />
          </button>
        </div>
        
        <div className="flex items-center gap-1 group cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 rounded-full bg-black"></div>
          <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
    </nav>
  );
}