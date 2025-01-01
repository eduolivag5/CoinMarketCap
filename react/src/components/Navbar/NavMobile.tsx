import { AiOutlineLineChart } from 'react-icons/ai'
import { BiSolidCategory } from 'react-icons/bi'
import { FaHome, FaRegStar, FaSearch } from 'react-icons/fa'
import MobileRouteLink from './MobileRouteLink'

const routes = [
    { href: '/', icon: <FaHome />, text: 'Home' },
    { href: '/watchlist', icon: <FaRegStar />, text: 'Favoritos' },  
    { href: '/search', icon: <FaSearch />, text: 'Buscar' },  
    { href: '/categories', icon: <BiSolidCategory />, text: 'Categorias' },
    //{ href: '/portfolio', icon: <FaWallet />, text: 'Cartera' },
    { href: '/global-metrics', icon: <AiOutlineLineChart />, text: 'Métricas' },    
]

export default function NavMobile() {

    return (
        <div className={`md:hidden p-3 bg-background drop-shadow-lg flex justify-evenly items-center`}>
            {routes.map((route) => (
                <MobileRouteLink key={route.href} href={route.href} icon={route.icon} text={route.text} />
            ))}
        </div>
    )
}
