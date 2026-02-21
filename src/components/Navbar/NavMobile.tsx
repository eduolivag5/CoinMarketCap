import { BiSolidCategory } from 'react-icons/bi'
import { FaHome, FaRegStar, FaSearch, FaWallet } from 'react-icons/fa'
import MobileRouteLink from './MobileRouteLink'
import { useContext } from 'react'
import { ThemeContext } from '../../ThemeContext'

const routes = [
    { href: '/', icon: <FaHome />, text: 'Home' },
    { href: '/watchlist', icon: <FaRegStar />, text: 'Favoritos' },  
    { href: '/search', icon: <FaSearch />, text: 'Buscar' },  
    { href: '/categories', icon: <BiSolidCategory />, text: 'Categorias' },
    { href: '/portfolio', icon: <FaWallet />, text: 'Cartera' },
]

export default function NavMobile() {

    const themeContext = useContext(ThemeContext);
    
    if (!themeContext) {
        throw new Error('ThemeContext debe ser usado dentro de un ThemeProvider');
    }

    const { theme } = themeContext;

    return (
        <div className={`md:hidden p-2 flex justify-evenly items-center fixed bottom-0 z-50 w-full backdrop-blur-[3px] backdrop-saturate-[100%] 
            ${theme === "dark" ? "bg-[#111212]" : "bg-[#e2e8f0]"} bg-opacity-90`}
        >
            {routes.map((route) => (
                <MobileRouteLink key={route.href} href={route.href} icon={route.icon} text={route.text} />
            ))}
        </div>
    )
}
