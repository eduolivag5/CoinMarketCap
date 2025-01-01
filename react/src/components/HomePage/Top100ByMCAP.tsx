import { useQuery } from '@tanstack/react-query'
import { getTop100 } from '../../api/coins'
import Loading from '../Loading'
import CoinsTable from '../CoinsTable'

export default function Top100ByMCAP() {

    const { data, isError, isLoading } = useQuery({
        queryKey: ['top100coins'],
        queryFn: getTop100
    })

    return (
        <div>
            
            {isError && <div>Error al cargar los datos</div>}

            {isLoading && <Loading />}

            {data && 
                <div className='space-y-2'>
                    <p className="font-bold">Principales monedas por capitalización de mercado</p>
                    <CoinsTable data={data} />
                </div>
            }
        </div>
    )
}
