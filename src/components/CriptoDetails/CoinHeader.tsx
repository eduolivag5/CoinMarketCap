import { cutFirst8Digits, formatNumber } from '../../utils';

export default function CoinHeader({data} : {data: any}) {
    const percent24h = data.prices.quote.USD.percent_change_24h;
    const isPositive = percent24h > 0;

    return (
        <div className='space-y-4'>
            <div className='flex items-center gap-3 flex-wrap'>
                <img src={data.logo} alt={data.name} className='h-10 w-10 rounded-full bg-secondary/20 p-0.5 shadow-sm' />
                <span className='text-2xl font-bold tracking-tight'>{data.name}</span>
                <span className='text-sm font-semibold uppercase opacity-60'>{data.symbol}</span>
                <span className='px-3.5 py-1 font-bold text-xs bg-secondary rounded-full ml-auto'>#{data.prices.cmc_rank}</span>            
            </div>
            <div className="flex items-center gap-4">
                <span className="text-3xl font-extrabold tracking-tight">${cutFirst8Digits(data.prices.quote.USD.price)}</span>
                <span className={`text-sm font-bold py-1 px-3.5 rounded-full ${isPositive ? 'text-positive bg-positive/10' : 'text-negative bg-negative/10'}`}>
                    {isPositive ? '+' : ''}
                    {formatNumber(percent24h.toFixed(2))}%
                </span>
            </div>
        </div>
    )
}