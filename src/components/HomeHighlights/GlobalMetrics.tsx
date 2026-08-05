import { formatBigNumber } from '../../utils';

interface GlobalMetricsProps {
    prices: {
        total_market_cap: number;
        total_volume_24h: number;
        total_volume_24h_yesterday_percentage_change: number;
        total_market_cap_yesterday_percentage_change: number;
    };
}

export default function GlobalMetrics({ prices }: GlobalMetricsProps) {
    const marketCapChange = prices.total_market_cap_yesterday_percentage_change;
    const volumeChange = prices.total_volume_24h_yesterday_percentage_change;

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Tarjeta de Market Cap */}
                <div className="relative overflow-hidden flex-1 p-5 flex flex-col justify-between gap-3 rounded-2xl w-full bg-secondary/15 hover:bg-secondary/25 transition-all shadow-sm">
                    {/* Barra indicadora lateral sin bordes */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${marketCapChange >= 0 ? 'bg-positive' : 'bg-negative'}`} />
                    
                    <span className="text-xs uppercase font-bold tracking-wider opacity-60 pl-1">
                        Capitalización de mercado
                    </span>
                    <div className="flex items-baseline justify-between gap-2 pl-1">
                        <span className="text-xl md:text-2xl font-black tracking-tight">
                            ${formatBigNumber(prices.total_market_cap.toFixed(0))}
                        </span>
                        <span className={`px-2.5 py-0.5 text-xs font-bold rounded-lg ${
                            marketCapChange >= 0 
                                ? 'bg-positive/10 text-positive' 
                                : 'bg-negative/10 text-negative'
                        }`}>
                            {marketCapChange >= 0 ? `+${marketCapChange.toFixed(2)}%` : `${marketCapChange.toFixed(2)}%`}
                        </span>
                    </div>
                </div>

                {/* Tarjeta de Volumen 24h */}
                <div className="relative overflow-hidden flex-1 p-5 flex flex-col justify-between gap-3 rounded-2xl w-full bg-secondary/15 hover:bg-secondary/25 transition-all shadow-sm">
                    {/* Barra indicadora lateral sin bordes */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${volumeChange >= 0 ? 'bg-positive' : 'bg-negative'}`} />

                    <span className="text-xs uppercase font-bold tracking-wider opacity-60 pl-1">
                        Volumen (24h)
                    </span>
                    <div className="flex items-baseline justify-between gap-2 pl-1">
                        <span className="text-xl md:text-2xl font-black tracking-tight">
                            ${formatBigNumber(prices.total_volume_24h.toFixed(0))}
                        </span>
                        <span className={`px-2.5 py-0.5 text-xs font-bold rounded-lg ${
                            volumeChange >= 0 
                                ? 'bg-positive/10 text-positive' 
                                : 'bg-negative/10 text-negative'
                        }`}>
                            {volumeChange >= 0 ? `+${volumeChange.toFixed(2)}%` : `${volumeChange.toFixed(2)}%`}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}