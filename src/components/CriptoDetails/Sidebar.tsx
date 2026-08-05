import CoinHeader from "./CoinHeader";
import CoinInformation from "./CoinInformation";
import Converter from "./Converter";
import MainDetails from "./MainDetails";
import MarketInfo from "./MarketInfo";

export default function Sidebar({data} : {data: any}) {
    return (
        <div>
            {data &&
                <div className="flex flex-col gap-6">
                    <div className="bg-secondary/10 p-6 rounded-3xl shadow-sm">
                        <CoinHeader data={data} />
                    </div>

                    <div className="bg-secondary/10 p-6 rounded-3xl shadow-sm space-y-3">
                        <p className="text-xl font-bold tracking-tight">Datos de mercado</p>
                        <MarketInfo quotes={data.prices} />
                    </div>  

                    <div className="md:hidden bg-secondary/10 p-6 rounded-3xl shadow-sm">
                        <MainDetails data={data} />
                    </div>               

                    <div className="bg-secondary/10 p-6 rounded-3xl shadow-sm space-y-3">
                        <p className="text-xl font-bold tracking-tight">Información</p>
                        <CoinInformation data={data} />
                    </div>

                    <div className="bg-secondary/10 p-6 rounded-3xl shadow-sm space-y-3">
                        <p className="text-xl font-bold tracking-tight">Conversor</p>
                        <Converter symbol={data.symbol} price={data.prices.quote.USD.price} logo={data.logo} />
                    </div>
                </div>
            }
        </div>
    )
}