import Top100ByMCAP from "../components/HomePage/Top100ByMCAP";
import Highlights from "../components/HomeHighlights/Highlights";

export default function Home() {
    

    return (
        <div className="mx-auto max-w-6xl space-y-6">   

            <p className="py-10 drop-shadow-[0px_0px_55px_rgba(98,56,214,0.9)] text-4xl md:text-6xl font-bold text-center">CoinMarketCap</p>         

            {/* Mostrar Highlights solo si el interruptor está activado */}
            <Highlights />
            
            {/* Mostrar Top100ByMCAP siempre */}
            <Top100ByMCAP />
        </div>
    );
}
