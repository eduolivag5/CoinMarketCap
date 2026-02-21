import { useContext } from 'react';
import { BiSolidCategory } from 'react-icons/bi';
import { FaHome, FaRegStar, FaSearch, FaWallet } from 'react-icons/fa';
import { ThemeContext } from '../../ThemeContext';
import MobileRouteLink from './MobileRouteLink';

const routes = [
  { href: '/', icon: <FaHome />, text: 'Home' },
  { href: '/watchlist', icon: <FaRegStar />, text: 'Favoritos' },  
  { href: '/search', icon: <FaSearch />, text: 'Buscar' },  
  { href: '/categories', icon: <BiSolidCategory />, text: 'Categorías' },
  { href: '/portfolio', icon: <FaWallet />, text: 'Cartera' },
];

export default function NavMobile() {
  const themeContext = useContext(ThemeContext);
  
  if (!themeContext) {
    throw new Error('ThemeContext debe ser usado dentro de un ThemeProvider');
  }

  const { theme } = themeContext;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full px-4 pb-4 pt-2 z-50">
      <nav className={`
        flex justify-around items-center px-2 py-1 rounded-2xl shadow-2xl border
        transition-all duration-300 backdrop-blur-xl
        ${theme === "dark" 
          ? "bg-[#111212]/85 border-white/10" 
          : "bg-white/85 border-black/5"}
      `}>
        {routes.map((route) => (
          <MobileRouteLink key={route.href} {...route} />
        ))}
      </nav>
    </div>
  );
}