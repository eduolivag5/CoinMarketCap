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
        staleTime: 1000 * 60 * 60
    });    

    return (
        <div className="w-full">
            {isError && <div className="py-12 text-center opacity-60 font-medium">Error al cargar los datos</div>}
            {isLoading && (
                <div className="py-16 flex justify-center">
                    <Loading />
                </div>
            )}

            {data && 
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-[420px] md:min-w-[420px]">
                        <Sidebar data={data} />
                    </div>
                    <div className="hidden md:block flex-1 bg-secondary/10 p-6 rounded-3xl">
                        <MainDetails data={data} />
                    </div>
                </div>
            }
        </div>
    );
}