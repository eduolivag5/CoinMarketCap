import { Link, useLocation } from "react-router-dom";

interface RouteLinkProps {
  href: string;
  text: string;
  icon: JSX.Element;
}

export default function MobileRouteLink({ href, icon, text }: RouteLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link 
      to={href} 
      className="relative flex flex-1 flex-col items-center justify-center py-2 gap-1 transition-all active:scale-90"
    >
      <span className={`text-xl transition-all duration-300 ${isActive ? 'text-blue-500 -translate-y-1' : 'text-gray-400'}`}>
        {icon}
      </span>
      <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
        {text}
      </span>
      
      {/* Indicador inferior animado */}
      {isActive && (
        <span className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
      )}
    </Link>
  );
}