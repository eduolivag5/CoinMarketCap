import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryDetails } from '../api/categories';
import Loading from '../components/Loading';
import CoinsTable from '../components/CoinsTable';
import Highlights from '../components/Categories/Highlights';
import { FaArrowLeft } from 'react-icons/fa';

export default function CategoryDetails() {

    const { id } = useParams<{ id: string }>();
    const { data, isError, isLoading } = useQuery({
        queryKey: [`details-${id}`],
        queryFn: () => getCategoryDetails(id!),
        staleTime: 1000 * 60 * 60
    });

    const navigate = useNavigate();

    return (
        <div>
            {isError && <p>Error al cargar los datos</p>}
            {isLoading && <Loading />}
            
            {data &&
                <div className='space-y-4'>
                    <div className='flex items-center gap-4'>
                        <button className='md:hidden p-2 bg-secondary rounded-full'>
                            <FaArrowLeft className="text-lg" onClick={() => navigate('/')} />
                        </button>
                        
                        <div>
                            <h1 className='text-2xl font-bold'>{data.data.name}</h1>
                            <p className='text-sm'>{data.data.title}</p>
                        </div>                        
                    </div>                    
                    
                    <div>
                        <Highlights data={data} />
                    </div>
                    
                    <CoinsTable data={data.data.coins} />
                    
                </div>
            }
        </div>
    )
}
