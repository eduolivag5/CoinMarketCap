import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';
import Navbar from './components/Navbar/Navbar';
import NavMobile from './components/Navbar/NavMobile';

export default function App() {
    return (
        <BrowserRouter>
            {/* Contenedor principal sin flex-col para evitar conflictos con fixed */}
            <div className="min-h-[100dvh] bg-background text-text">
                
                <Navbar />

                <main className="
                    /* Espaciado para Desktop: Navbar (80px aprox) */
                    pt-24 md:pt-28 
                    /* Espaciado para Móvil: NavMobile flotante (90px aprox) */
                    pb-28 md:pb-8 
                    /* Padding lateral */
                    px-4 md:px-12 
                    /* Centrado del contenido máximo */
                    max-w-[1600px] mx-auto
                ">
                    <AppRoutes />
                </main>

                <NavMobile />
                
            </div>
        </BrowserRouter>
    );
}