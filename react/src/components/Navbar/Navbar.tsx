import { FaHome, FaRegStar, FaSearch } from "react-icons/fa";
import { AiOutlineLineChart } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import RouteLink from "./RouteLink";
import { useContext } from 'react';
import { ThemeContext } from "../../ThemeContext";
import { Link } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";

const routes = [
    { href: '/', icon: <FaHome />, text: 'Home' },
    { href: '/global-metrics', icon: <AiOutlineLineChart />, text: 'Métricas globales' },
    /*{ href: '/portfolio', icon: <FaWallet />, text: 'Cartera' },*/
    { href: '/categories', icon: <BiSolidCategory />, text: 'Categorias' },
    { href: '/watchlist', icon: <FaRegStar />, text: 'Lista de seguimiento' },
    { href: '/search', icon: <FaSearch />, text: 'Buscar' },
]

export default function Navbar() {

    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error('ThemeContext debe ser usado dentro de un ThemeProvider');
    }

    const { theme, toggleTheme } = themeContext;

    return (
        <header className="text-text bg-background px-4 md:px-8 py-3 md:py-2 text-sm drop-shadow-lg">
            <div className="flex items-center gap-6 justify-between">
                
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-2">
                        <Link to='/' className="text-text">
                            {theme === 'dark' ? 
                                <img
                                    src="/coinmarketcap_2.svg"
                                    alt="CoinMarketCap Logo"
                                    className="h-8"
                                />
                            :
                                <img
                                    src="/coinmarketcap_1.svg"
                                    alt="CoinMarketCap Logo"
                                    className="h-8"
                                />
                            }
                            
                        </Link>              
                    </div>

                    
                    <nav className="hidden md:flex items-center gap-1">
                        {routes.map((route) => (
                            <RouteLink key={route.href} href={route.href} icon={route.icon} text={route.text} />
                        ))}
                    </nav>
                </div>


                <div className="flex items-center gap-2">                    
                    <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            id="theme-toggle"
                            className="sr-only"
                            checked={theme === 'dark'}
                            onChange={toggleTheme}
                        />
                        <div className="w-11 h-6 bg-secondary rounded-full dark:bg-primary"></div>
                        <span
                        className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition transform duration-300 ease-in-out ${
                            theme === 'dark' ? 'translate-x-5' : ''
                        }`}></span>
                    </label>

                    {theme === 'dark' ? 
                        <FiMoon className="w-4 h-4" />
                        :
                        <FiSun className="w-4 h-4" />
                    }
                </div>
                
            </div>
        </header>
    );
};
