import type { QuoteSchemaType } from "../../types"
import { formatMarketCap } from "../../utils"

export default function MarketInfo({ quotes } : {quotes: QuoteSchemaType}) {
    const marketsDetails = [
        {
            title: 'Capitalización de mercado',
            value: `${formatMarketCap(quotes.quote.USD.market_cap!)} US$`
        },
        {
            title: 'Volumen (24h)',
            value: `${formatMarketCap(quotes.quote.USD.volume_24h)} US$`
        },
        {
            title: 'FDV',
            value: `${formatMarketCap(quotes.quote.USD.fully_diluted_market_cap)} US$`
        },
        {
            title: 'Suministro total',
            value: `${quotes.total_supply != null ? formatMarketCap(quotes.total_supply) : '∞'}`
        },
        {
            title: 'Suministro máx.',
            value: `${quotes.max_supply != null ? formatMarketCap(quotes.max_supply) : '∞'}`
        },
        {
            title: 'Suministro en circulación',
            value: `${quotes.circulating_supply != null ? formatMarketCap(quotes.circulating_supply) : '∞'}`
        }
    ]

    return (
        <div className="grid grid-cols-2 gap-3">
            {marketsDetails.map((market) => (
                <div key={market.title} 
                    className='flex flex-col items-center justify-center text-center rounded-2xl text-sm p-3 gap-1 bg-secondary transition-colors'>
                    <p className='text-xs opacity-60 font-medium'>{market.title}</p>
                    <p className="font-bold tracking-tight">{market.value}</p>
                </div>
            ))}
        </div>
    )
}