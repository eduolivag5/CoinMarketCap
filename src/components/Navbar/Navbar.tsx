import { useContext } from 'react';
import { Link } from "react-router-dom";
import { FaHome, FaRegStar, FaSearch, FaWallet } from "react-icons/fa";
import { AiOutlineLineChart } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { FiMoon, FiSun } from "react-icons/fi";
import { ThemeContext } from "../../ThemeContext";
import RouteLink from "./RouteLink";

// Definición de tipos para las rutas
interface RouteItem {
  href: string;
  icon: JSX.Element;
  text: string;
}

const routes: RouteItem[] = [
  { href: '/', icon: <FaHome />, text: 'Home' },
  { href: '/global-metrics', icon: <AiOutlineLineChart />, text: 'Métricas' },
  { href: '/portfolio', icon: <FaWallet />, text: 'Cartera' },
  { href: '/categories', icon: <BiSolidCategory />, text: 'Categorías' },
  { href: '/watchlist', icon: <FaRegStar />, text: 'Watchlist' },
  { href: '/search', icon: <FaSearch />, text: 'Buscar' },
];

export default function Navbar() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeContext debe ser usado dentro de un ThemeProvider');
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <header 
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl 
      rounded-2xl border transition-all duration-300
      ${theme === "dark" 
        ? "bg-[#111212]/80 border-white/10" 
        : "bg-white/70 border-black/5"} 
      backdrop-blur-md shadow-lg px-6 py-3`}
    >
      <div className="flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link to='/' className="transition-transform hover:scale-105 active:scale-95">
            <img
              src={theme === 'dark' ? "/coinmarketcap_2.svg" : "/coinmarketcap_1.svg"}
              alt="Logo"
              className="h-7 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {routes.map((route) => (
              <RouteLink 
                key={route.href} 
                href={route.href} 
                icon={route.icon} 
                text={route.text} 
              />
            ))}
          </nav>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-all duration-300 
            ${theme === 'dark' 
              ? 'bg-white/5 hover:bg-white/10 text-yellow-400' 
              : 'bg-black/5 hover:bg-black/10 text-indigo-600'}`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}