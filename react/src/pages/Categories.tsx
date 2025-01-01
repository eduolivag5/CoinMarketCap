import { getCategories } from '../api/categories';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
import CategoriesTable from '../components/Categories/CategoriesTable';

export default function Categories() {

    const { data, isError, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
    });

    return (
        <div>
            {isError && <div>Error al cargar los datos</div>}
            {isLoading && <Loading />}

            {data && 
                <div>
                    <h3 className="text-2xl font-bold">Categorías</h3>
                    <CategoriesTable categories={data} />
                </div>
            }
        </div>
    )
}
