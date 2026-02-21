import { Link, useLocation } from "react-router-dom";

interface RouteLinkProps {
  href: string;
  text: string;
  icon: JSX.Element;
}

export default function RouteLink({ href, icon, text }: RouteLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link 
      to={href} 
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium
        transition-all duration-300 ease-out active:scale-95
        ${isActive 
          ? 'bg-blue-600/10 text-blue-500 shadow-sm' 
          : 'text-gray-500 hover:bg-gray-500/10 hover:text-gray-700 dark:hover:text-gray-200'}
      `}
    >
      <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'opacity-70'}`}>
        {icon}
      </span>
      {text}
    </Link>
  );
}