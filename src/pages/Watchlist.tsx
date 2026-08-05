import { useQuery } from '@tanstack/react-query';
import useWatchlistStore from '../store/watchlist';
import { getCriptoListInfo } from '../api/coins';
import Loading from '../components/Loading';
import CoinsTable from '../components/CoinsTable';
import { FaRegStar } from 'react-icons/fa';

export default function Watchlist() {
    const { watchlist } = useWatchlistStore();

    const { data, isError, isLoading } = useQuery({
        queryKey: ['watchlist'],
        queryFn: () => getCriptoListInfo(watchlist),
        staleTime: 1000 * 60 * 60,
        enabled: watchlist.length > 0, // Evita la query si no hay elementos guardados
    });

    return (
        <div className='space-y-6 max-w-6xl mx-auto pb-16'>
            <div className="border-b border-secondary pb-4">
                <span className="text-xs font-bold uppercase tracking-widest opacity-50">Favoritos</span>
                <h3 className="text-3xl font-black tracking-tight mt-1">Lista de seguimiento</h3>
            </div>

            {isError && (
                <div className="p-4 rounded-xl border border-secondary text-negative font-medium bg-secondary/10">
                    Error al cargar los datos de la lista de seguimiento.
                </div>
            )}
            
            {isLoading && watchlist.length > 0 && <Loading />}

            {/* Estado vacío estilizado */}
            {(!watchlist.length || (data && data.length === 0)) && !isLoading && (
                <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl space-y-4 my-12">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/30 flex items-center justify-center text-primary shadow-sm border border-secondary">
                        <FaRegStar className="w-8 h-8 opacity-60" />
                    </div>
                    <div className="space-y-1 max-w-sm">
                        <h4 className="font-bold text-lg">Tu lista está vacía</h4>
                        <p className="text-sm opacity-60 font-medium">
                            Explora el mercado y haz clic en el icono de la estrella en cualquier criptomoneda para añadirla a tus favoritos y seguirla de cerca.
                        </p>
                    </div>
                </div>
            )}

            {data && data.length > 0 && (
                <CoinsTable data={data} />
            )}
        </div>
    );
}