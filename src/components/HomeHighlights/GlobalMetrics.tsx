import { formatNumber } from '../../utils'

interface GlobalMetricsProps {
    prices: {
        total_market_cap: number,
        total_volume_24h: number,
        total_volume_24h_yesterday_percentage_change: number,
        total_market_cap_yesterday_percentage_change: number,
    }
}

const classNameContainer = "flex-1 py-2 px-4 flex flex-col gap-1 rounded-lg w-full"

export default function GlobalMetrics({ prices } : GlobalMetricsProps) {

    return (
        <div>
            <div className='flex flex-col items-center justify-evenly gap-2'>
                <div className={classNameContainer}>
                    <div className='flex items-center gap-4'>
                        <span>{formatNumber(prices.total_market_cap.toFixed(0))}</span>
                        <span className={`px-4 py-1 text-sm rounded-full text-black ${prices.total_market_cap_yesterday_percentage_change > 0 ? 'bg-positive' : 'bg-negative text-white'}`}>
                            {prices.total_market_cap_yesterday_percentage_change.toFixed(2)}%
                        </span>
                    </div>
                    <p className='text-xs'>Market Cap</p>
                </div>
                <div className={classNameContainer}>
                    <div className='flex items-center gap-4'>
                        <span>{formatNumber(prices.total_volume_24h.toFixed(0))}</span>
                        <span className={`px-4 py-1 text-sm rounded-full text-black ${prices.total_volume_24h_yesterday_percentage_change > 0 ? 'bg-positive' : 'bg-negative text-white'}`}>
                            {prices.total_volume_24h_yesterday_percentage_change.toFixed(2)}%
                        </span>
                    </div>
                    <p className='text-xs'>24h Trading Volume</p>
                </div>
            </div>
        </div>
    )
}
