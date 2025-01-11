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
        <div className="w-full min-h-full flex flex-col gap-4">
            <div className="inline-flex text-sm w-full items-center border-b border-secondary">
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className={`${activeMenu === item.href ? 'border-b-2 border-blue-500' : ''} px-4 py-2 transition-colors duration-200`}
                        onClick={() => setActiveMenu(item.href)}
                    >
                        {item.name}
                    </a>
                ))}
            </div>

            <div className="text-2xl font-bold mb-8 space-y-2" id="graph">
                <h1>Gráfico</h1>
                <p className="text-xs font-light">Nota: Es posible que algunos símbolos no se muestren en el gráfico.</p>
                <div className="h-96 min-h-96">
                    <TradingViewChart symbol={`${data.symbol}`} />
                </div>
            </div>

            <div className="text-2xl font-bold space-y-2" id="contracts">
                <h1>{data.name} Contratos</h1>
                <Contracts contracts={data.contract_address} />
            </div>

            <div className="text-2xl font-bold space-y-2" id="about">
                <h1>Acerca de {data.name}</h1>
                <p className="text-sm font-normal">{data.description}</p>
            </div>

        </div>
    ) 
}
