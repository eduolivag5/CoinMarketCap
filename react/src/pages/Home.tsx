import { useState } from "react";
import Top100ByMCAP from "../components/HomePage/Top100ByMCAP";
import Highlights from "../components/HomeHighlights/Highlights";

export default function Home() {
    // Estado para controlar la visibilidad de Highlights
    const [showHighlights, setShowHighlights] = useState(true);

    // Función para manejar el cambio del interruptor
    const toggleHighlights = () => {
        setShowHighlights(prevState => !prevState);
    };

    return (
        <div className="mx-auto max-w-6xl space-y-4">

            <div className="flex items-center justify-between">
                <h1 className="font-bold">Highlights</h1>
                <div className="flex items-center gap-2">
                    <label htmlFor="highlights-toggle" className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id="highlights-toggle"
                                className="sr-only"
                                checked={showHighlights}
                                onChange={toggleHighlights}
                            />
                            <div className={`w-11 h-6 rounded-full ${showHighlights ? 'bg-primary' : 'bg-secondary'}`}></div>
                            <span
                            className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition transform duration-300 ease-in-out ${
                                showHighlights ? 'translate-x-5' : ''
                            }`}></span>
                        </label>
                    <span className="text-sm font-semibold">Mostrar</span>
                </div>
            </div>
            

            {/* Mostrar Highlights solo si el interruptor está activado */}
            {showHighlights && <Highlights />}
            
            {/* Mostrar Top100ByMCAP siempre */}
            <Top100ByMCAP />
        </div>
    );
}
