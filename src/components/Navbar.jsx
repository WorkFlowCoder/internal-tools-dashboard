import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Zap, Bell, ChevronDown, Settings as SettingsIcon, Search, Menu, X, Moon } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/tools", label: "Tools" },
    { to: "/analytics", label: "Analytics" },
    { to: "/settings", label: "Settings", disabled: true },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between">
        
        {/* LOGO & DESKTOP LINKS */}
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
              <Zap size={20}/>
            </div>
            <span className="font-bold text-xl tracking-tight text-black">TechCorp</span>
          </Link>

          {/* Version web */}
          <div className="hidden sm:flex items-center gap-6 lg:gap-8"> 
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

        {/* Search + Icons */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="relative group mr-2">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search tools ..." 
              className="w-48 bg-gray-50 border border-gray-200 rounded-lg py-1.5 pl-9 pr-3 text-sm outline-none focus:bg-white focus:border-black transition-all"
            />
          </div>

          <div className="flex items-center gap-1 text-gray-500 border-l pl-3 border-gray-100">
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <Bell size={19} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Moon size={19} />
            </button>
          </div>
          
          <div className="flex items-center gap-1 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-black"></div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>

        {/* HAMBURGER BUTTON */}
        <div className="sm:hidden flex items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* version mobile */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="relative w-full">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search tools ..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 text-sm outline-none"
            />
          </div>
          
          <div className="flex flex-col gap-4 border-t pt-4">
            {navLinks.map((link) => (
              <NavLink 
                key={link.label} 
                to={link.to} 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 font-medium hover:text-black"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex gap-4">
               <Moon size={20} className="text-gray-500" />
               <Bell size={20} className="text-gray-500" />
               <SettingsIcon size={20} className="text-gray-500" />
            </div>
            <div className="h-8 w-8 rounded-full bg-black"></div>
          </div>
        </div>
      )}
    </nav>
  );
}