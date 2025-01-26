import { CategoryDetailsType } from "../../types"
import { cutFirst8Digits, formatMarketCap } from "../../utils"

interface HighlightsProps {
    data: CategoryDetailsType
}

export default function Highlights({ data } : HighlightsProps) {

    const sorteredPositiveCoins = data.data.coins
                                    .sort((a, b) => b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h)
                                    .slice(0, 3)

    const sorteredNegativeCoins = data.data.coins
                                    .sort((a, b) => a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h)
                                    .slice(0, 3)

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-lg text-sm border border-secondary p-4 space-y-3">
                <div className="flex flex-col gap-1">
                    <p className="font-bold">Capitalización de mercado</p>
                    <div className="flex items-center gap-2 font-semibold">
                        <span>${formatMarketCap(data.data.market_cap)}</span>
                        <span className={`text-black px-4 py-1 rounded-full ${data.data.market_cap_change && data.data.market_cap_change > 0 ? 'bg-positive' : 'bg-negative text-white'}`}>
                            {data.data.market_cap_change?.toFixed(2)}%
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <p className="font-bold">Volumen</p>
                    <div className="flex items-center gap-2 font-semibold">
                        <span>${formatMarketCap(data.data.volume)}</span>
                        <span className={`text-black px-4 py-1 rounded-full ${data.data.volume_change && data.data.volume_change > 0 ? 'bg-positive' : 'bg-negative text-white'}`}>
                            {data.data.volume_change?.toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border border-secondary p-4 space-y-2">
                <h2 className="text-sm font-bold">Mayores ganadores</h2>
                <div className="flex flex-col gap-2">
                    <table className="w-full text-xs">
                        <tbody>
                        {sorteredPositiveCoins
                            .map((coin) => (
                                <tr key={coin.id} className="font-semibold">
                                    <td className="p-1 flex items-center gap-2">
                                        <img src={coin.logo} className="w-6 h-6 rounded-full" alt={coin.name} />
                                        {coin.symbol}
                                    </td>
                                    <td className="p-1">
                                        {coin.quote.USD.price ? `$${cutFirst8Digits(coin.quote.USD.price)}` : ""}
                                    </td>
                                    <td className={`p-1 text-right ${coin.quote.USD.percent_change_24h > 0 ? 'text-positive' : 'text-negative'}`}>
                                        {coin.quote.USD.percent_change_24h.toFixed(2)}%
                                    </td>
                                </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="rounded-lg border border-secondary p-4 space-y-2 hidden lg:block">
                <h2 className="text-sm font-bold">Peor rendimiento</h2>
                <div className="flex flex-col gap-2">                    
                    <table className="w-full text-xs">
                        <tbody>
                        {sorteredNegativeCoins
                            .map((coin) => (
                                <tr key={coin.id} className="font-semibold">
                                    <td className="p-1 flex items-center gap-2">
                                        <img src={coin.logo} className="w-6 h-6 rounded-full" alt={coin.name} />
                                        {coin.symbol}
                                    </td>
                                    <td className="p-1">
                                        {coin.quote.USD.price ? `$${cutFirst8Digits(coin.quote.USD.price)}` : ""}
                                    </td>

                                    <td className={`p-1 text-right ${coin.quote.USD.percent_change_24h > 0 ? 'text-positive' : 'text-negative'}`}>
                                        {coin.quote.USD.percent_change_24h.toFixed(2)}%
                                    </td>
                                </tr>
                        ))}
                        </tbody>
                    </table>                    
                </div>
            </div>
        </div>
    )
}
