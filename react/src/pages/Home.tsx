import Top100ByMCAP from "../components/HomePage/Top100ByMCAP";
import Highlights from "../components/HomeHighlights/Highlights";

export default function Home() {
    

    return (
        <div className="mx-auto max-w-6xl space-y-6">            

            {/* Mostrar Highlights solo si el interruptor está activado */}
            <Highlights />
            
            {/* Mostrar Top100ByMCAP siempre */}
            <Top100ByMCAP />
        </div>
    );
}
