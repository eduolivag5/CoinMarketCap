import { useState } from 'react'
import TradingViewChart from './PricesGraph'
import Contracts from './Contracts';

interface MainDetailsProps {
    data: any;
}

const menuItems = [
    { name: 'Gráfico', href: '#graph' },
    { name: 'Contratos', href: '#contracts' },
    { name: 'Acerca', href: '#about' },
]

export default function MainDetails({ data } : MainDetailsProps) {
    const [activeMenu, setActiveMenu] = useState(menuItems[0].href);

    return (
        <div className="w-full min-h-full flex flex-col gap-8">
            <div className="inline-flex text-sm w-full items-center gap-2 bg-secondary/20 p-2 rounded-2xl">
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className={`${activeMenu === item.href ? 'bg-secondary font-bold shadow-sm' : 'opacity-70 hover:opacity-100'} px-5 py-2.5 rounded-xl transition-all duration-200`}
                        onClick={() => setActiveMenu(item.href)}
                    >
                        {item.name}
                    </a>
                ))}
            </div>

            <div className="space-y-3" id="graph">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold tracking-tight">Gráfico</h1>
                    <p className="text-xs opacity-50 font-medium">Nota: Es posible que algunos símbolos no se muestren en el gráfico.</p>
                </div>
                <div className="h-[450px] min-h-[450px] w-full rounded-2xl overflow-hidden bg-secondary/20 p-4">
                    <TradingViewChart symbol={`${data.symbol}`} />
                </div>
            </div>

            <div className="space-y-3" id="contracts">
                <h1 className="text-2xl font-bold tracking-tight">{data.name} Contratos</h1>
                <Contracts contracts={data.contract_address} />
            </div>

            <div className="space-y-3" id="about">
                <h1 className="text-2xl font-bold tracking-tight">Acerca de {data.name}</h1>
                <p className="text-sm opacity-80 leading-relaxed font-normal bg-secondary/20 p-5 rounded-2xl">{data.description}</p>
            </div>
        </div>
    ) 
}