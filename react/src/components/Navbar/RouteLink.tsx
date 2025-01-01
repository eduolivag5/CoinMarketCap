import { Link, useLocation } from "react-router-dom";

interface RouteLinkProps {
    href: string;
    text: string;
    icon: JSX.Element;
}

export default function RouteLink({ href, icon, text }: RouteLinkProps) {

    const location = useLocation();

    // Verifica si la ruta actual coincide con el href del enlace
    const isActive = location.pathname === href;

    return (
        <Link to={href} className={`flex text-xs items-center gap-3 px-4 py-2 rounded-full hover:bg-secondary transition-colors duration-300 ${isActive ? 'bg-secondary' : ''}`}>
            <span>{icon}</span>
            {text}
        </Link>
    )
}
