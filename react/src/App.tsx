import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';
import Navbar from './components/Navbar/Navbar';
import NavMobile from './components/Navbar/NavMobile';

export default function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col h-[100dvh]">
                <Navbar />

                <div className="flex-1 overflow-y-auto bg-background text-text p-4 pt-16 md:p-8 md:pt-20 drop-shadow-lg">
                    <AppRoutes />
                </div>

                <NavMobile />
            </div>
        </BrowserRouter>
    );
}
