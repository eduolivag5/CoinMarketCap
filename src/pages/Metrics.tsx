import { useQuery } from '@tanstack/react-query';
import { getGlobalMetrics } from '../api/market';
import Loading from '../components/Loading';
import MetricsItem from '../components/Metrics/MetricsItem';
import { FaGlobe, FaShieldAlt } from "react-icons/fa";
import { formatBigNumber } from '../utils';

export default function Metrics() {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['global-metrics'],
        queryFn: () => getGlobalMetrics(),
        staleTime: 1000 * 60 * 60 * 24
    });

    const btcDom = data?.btc_dominance ?? 0;
    const ethDom = data?.eth_dominance ?? 0;
    const otherDom = 100 - (btcDom + ethDom);

    return (
        <div className='space-y-8 h-full pb-16 max-w-6xl mx-auto'>
            {/* Cabecera minimalista */}
            <div className="flex items-end justify-between border-b border-secondary pb-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-50">Market Intelligence</span>
                    <h3 className="text-4xl font-black tracking-tight mt-1">Métricas Globales</h3>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs opacity-60 bg-secondary/40 px-3 py-1.5 rounded-full border border-secondary">
                    <span className="w-2 h-2 rounded-full bg-positive animate-pulse"></span>
                    <span>Actualizado en tiempo real</span>
                </div>
            </div>

            {isError && (
                <div className="p-4 rounded-xl border border-secondary text-negative font-medium">
                    Error al cargar los datos.
                </div>
            )}
            
            {isLoading && <Loading />}

            {data && (
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    
                    {/* COLUMNA IZQUIERDA Y CENTRAL: Bloque Protagonista */}
                    <div className='lg:col-span-2 space-y-6'>
                        
                        {/* HERO CARD: Capitalización Total */}
                        <div className='rounded-3xl border border-secondary bg-secondary/10 p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px]'>
                            <div className="absolute right-[-20px] bottom-[-20px] opacity-5 pointer-events-none">
                                <FaGlobe size={220} />
                            </div>
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider opacity-60">Capitalización Global del Mercado</span>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-2 truncate">
                                    ${formatBigNumber(data.quote.USD.total_market_cap, 2)}
                                </h1>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-secondary/50">
                                <div>
                                    <span className="text-xs opacity-60 block">Altcoins Cap</span>
                                    <span className="text-sm sm:text-base font-bold">${formatBigNumber(data.quote.USD.altcoin_market_cap, 2)}</span>
                                </div>
                                <div>
                                    <span className="text-xs opacity-60 block">Stablecoins Cap</span>
                                    <span className="text-sm sm:text-base font-bold">${formatBigNumber(data.stablecoin_market_cap, 2)}</span>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <span className="text-xs opacity-60 block">Volumen 24h</span>
                                    <span className="text-sm sm:text-base font-bold">${formatBigNumber(data.quote.USD.total_volume_24h, 2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Grid secundario */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <MetricsItem 
                                title="Volumen Total 24h" 
                                value={data.quote.USD.total_volume_24h} 
                                yesterday={data.quote.USD.total_volume_24h_yesterday_percentage_change} 
                                decimals={2}
                                isCurrency={true}
                            />
                            <MetricsItem 
                                title="Volumen Altcoins" 
                                value={data.quote.USD.altcoin_volume_24h} 
                                decimals={2}
                                isCurrency={true}
                            />
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: Sidebar de Dominancias y Red */}
                    <div className='space-y-6 flex flex-col'>
                        
                        <div className='rounded-3xl border border-secondary p-6 space-y-6 flex-1 flex flex-col justify-between bg-secondary/20'>
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-bold text-lg">Dominancia del Mercado</h4>
                                    <FaShieldAlt className="opacity-40 text-xl" />
                                </div>
                                
                                <div className="space-y-2">
                                    <div className="w-full h-4 bg-secondary rounded-full overflow-hidden flex p-0.5 border border-secondary">
                                        <div style={{ width: `${btcDom}%` }} className="bg-positive h-full rounded-l-full transition-all duration-500" />
                                        <div style={{ width: `${ethDom}%` }} className="bg-primary h-full transition-all duration-500" />
                                        <div style={{ width: `${otherDom}%` }} className="opacity-40 bg-text h-full rounded-r-full transition-all duration-500" />
                                    </div>
                                    <div className="flex justify-between text-[11px] opacity-60 font-medium px-1">
                                        <span>BTC {btcDom.toFixed(1)}%</span>
                                        <span>ETH {ethDom.toFixed(1)}%</span>
                                        <span>Resto {otherDom.toFixed(1)}%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-secondary/50">
                                <MetricsItem 
                                    title="Dominancia Bitcoin" 
                                    value={btcDom} 
                                    yesterday={data.btc_dominance_24h_percentage_change} 
                                    decimals={2}
                                    suffix="%"
                                />
                                <MetricsItem 
                                    title="Dominancia Ethereum" 
                                    value={ethDom} 
                                    yesterday={data.eth_dominance_24h_percentage_change} 
                                    decimals={2}
                                    suffix="%"
                                />
                            </div>

                            <div className="pt-4 border-t border-secondary/50 space-y-1">
                                <span className="text-xs font-bold uppercase tracking-wider opacity-50 block mb-2">Ecosistema</span>
                                <MetricsItem title="Criptomonedas" value={data.total_cryptocurrencies} compact decimals={0} />
                                <MetricsItem title="Pares Activos" value={data.active_market_pairs} compact decimals={0} />
                                <MetricsItem title="Exchanges" value={data.total_exchanges} compact decimals={0} />
                            </div>
                        </div>

                    </div>

                </div>
            )}
        </div>
    )
}