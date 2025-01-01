import CoinHeader from "./CoinHeader";
import CoinInformation from "./CoinInformation";
import Converter from "./Converter";
import MainDetails from "./MainDetails";
import MarketInfo from "./MarketInfo";



export default function Sidebar({data} : {data: any}) {

    return (
        <div>
            {data &&
                <div className="flex flex-col gap-4">
                    <div>
                        <CoinHeader data={data} />
                    </div>

                    <div className="py-4 space-y-2">
                        <p className="text-xl font-semibold">Datos de mercado</p>
                        <MarketInfo quotes={data.prices} />
                    </div>  

                    <div className="md:hidden">
                        <MainDetails data={data} />
                    </div>                  

                    <div className="space-y-2">
                        <p className="text-xl font-semibold">Información</p>
                        <CoinInformation data={data} />
                    </div>

                    <div className="space-y-2">
                        <p className="text-xl font-semibold">Conversor</p>
                        <Converter symbol={data.symbol} price={data.prices.quote.USD.price} logo={data.logo} />
                    </div>
                </div>
                
            }
        </div>
        
        
    )
}
