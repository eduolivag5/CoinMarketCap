import { Link, useLocation } from "react-router-dom";

interface RouteLinkProps {
    href: string;
    text: string;
    icon: JSX.Element;
}

export default function MobileRouteLink({ href, icon, text }: RouteLinkProps) {

    const location = useLocation();

    // Verifica si la ruta actual coincide con el href del enlace
    const isActive = location.pathname === href;

    return (
        <Link to={href} 
            className={`p-2 rounded-lg flex-1 flex flex-col gap-1 items-center justify-center text-center hover:text-primary ${isActive ? 'text-primary' : 'text-text'}`}
        >
            <span className='text-xl'>{icon}</span>
            <span className='text-xs'>{text}</span>
        </Link>
    )
}
