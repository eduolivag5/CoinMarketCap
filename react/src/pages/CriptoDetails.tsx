import { useParams } from "react-router-dom";
import { getCryptoDetails } from "../api/coins";
import Sidebar from "../components/CriptoDetails/Sidebar";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import MainDetails from "../components/CriptoDetails/MainDetails";



export default function CriptoDetails() {
    const { id } = useParams<{ id: string }>();
    const { data, isError, isLoading } = useQuery({
        queryKey: [`details-${id}`],
        queryFn: () => getCryptoDetails(id!),
    });

    

    return (
        <div>
            {isError && <div>Error al cargar los datos</div>}
            {isLoading && <Loading />}

            {data && 
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-96 md:min-w-96">
                        <Sidebar data={data} />
                    </div>
                    <div className="hidden md:block">
                        <MainDetails data={data} />
                    </div>
                </div>
            }
            
        </div>
    );
}
