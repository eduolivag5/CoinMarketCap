import { useQuery } from '@tanstack/react-query';
import useWatchlistStore from '../store/watchlist';
import { getCriptoListInfo } from '../api/coins';
import Loading from '../components/Loading';
import CoinsTable from '../components/CoinsTable';

export default function Watchlist() {

    const { watchlist } = useWatchlistStore();

    const { data, isError, isLoading } = useQuery({
        queryKey: ['watchlist'],
        queryFn: () => getCriptoListInfo(watchlist)
    })

    return (
        <div className='space-y-4'>
            <h3 className="text-2xl font-bold">Lista de seguimiento</h3>
            {isError && <div>Error al cargar los datos.</div>}
            {isLoading && <Loading />}

            {data && data.length === 0 && (
                <p className="text-sm font-normal">No hay criptomonedas en tu lista de seguimiento.</p>
            )}

            {data && data.length > 0 && (
                <CoinsTable data={data} />
            )}
        </div>
    )
}
