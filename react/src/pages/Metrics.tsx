import { useQuery } from '@tanstack/react-query';
import { getGlobalMetrics } from '../api/market';
import Loading from '../components/Loading';
import MetricsItem from '../components/Metrics/MetricsItem';

export default function Metrics() {

    const { data, isError, isLoading } = useQuery({
        queryKey: ['global-metrics'],
        queryFn: () => getGlobalMetrics(),
        staleTime: 1000 * 60 * 60 * 24
    });

    return (
        <div className='space-y-4 h-full'>
            <h3 className="text-2xl font-bold">Métricas globales</h3>
            {isError && <div>Error al cargar los datos.</div>}
            {isLoading && <Loading />}

            {data && (
                <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {/* Datos Globales */}
                    <div className='rounded-lg border border-secondary p-4'>
                        <p className='text-lg font-bold mb-2'>Datos Globales</p>
                        <div className='flex flex-col gap-4'>
                            <MetricsItem title="Criptomonedas totales" value={data.total_cryptocurrencies} />
                            <MetricsItem title="Pares de monedas activos" value={data.active_market_pairs} />
                            <MetricsItem title="Exchanges totales" value={data.total_exchanges} />
                        </div>
                    </div>

                    {/* Capitalización de Mercado */}
                    <div className='rounded-lg border border-secondary p-4'>
                        <p className='text-lg font-bold mb-2'>Capitalización de Mercado</p>
                        <div className='flex flex-col gap-4'>
                            <MetricsItem title="Total" value={data.quote.USD.total_market_cap.toFixed(0)} />
                            <MetricsItem title="Altcoins" value={data.quote.USD.altcoin_market_cap.toFixed(0)} />
                            <MetricsItem title="Stablecoins" value={data.stablecoin_market_cap.toFixed(0)} />                            
                        </div>
                    </div>

                    {/* Volumen */}
                    <div className='rounded-lg border border-secondary p-4'>
                        <p className='text-lg font-bold mb-2'>Volumen 24h</p>
                        <div className='flex flex-col gap-4'>
                        <MetricsItem title="Total" value={data.quote.USD.total_volume_24h.toFixed(0)} yesterday={data.quote.USD.total_volume_24h_yesterday_percentage_change} />
                            <MetricsItem title="Altcoins" value={data.quote.USD.altcoin_volume_24h.toFixed(0)} />
                            <MetricsItem title="Stablecoins" value={data.stablecoin_volume_24h.toFixed(0)} />                            
                        </div>
                    </div>

                    {/* Dominancias */}
                    <div className='rounded-lg border border-secondary p-4'>
                        <p className='text-lg font-bold mb-2'>Dominancias</p>
                        <div className='flex flex-col gap-4'>
                            <MetricsItem title="Dominancia BTC" value={`${data.btc_dominance.toFixed(2)}`} yesterday={data.btc_dominance_24h_percentage_change} />
                            <MetricsItem title="Dominancia ETH" value={`${data.eth_dominance.toFixed(2)}%`} yesterday={data.eth_dominance_24h_percentage_change} />
                        </div>
                    </div>
                </div>
            )}

            {/*<div className='w-1/2 h-96 min-h-96'>
                <News />
            </div>*/}
        </div>
    )
}
