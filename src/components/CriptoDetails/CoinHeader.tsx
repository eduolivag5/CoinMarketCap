import { cutFirst8Digits } from '../../utils';

export default function CoinHeader({data} : {data: any}) {

    return (
        <div className='space-y-4'>
            <div className='flex items-center gap-4 flex-wrap'>
                
                <img src={data.logo} alt={data.name} className='h-10 w-10 rounded-full' />
                <span className='text-2xl font-bold'>{data.name}</span>
                <span className='text-lg font-semibold'>{data.symbol}</span>
                <span className='px-4 font-semibold text-sm bg-secondary rounded-full'>#{data.prices.cmc_rank}</span>              
            </div>
            <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">{cutFirst8Digits(data.prices.quote.USD.price)} $</span>
                <span className={`text-sm font-semibold py-1 px-4 rounded-full text-black ${data.prices.quote.USD.percent_change_24h > 0 ? 'bg-positive' : 'bg-negative text-white'}`}>
                    {data.prices.quote.USD.percent_change_24h > 0 ? '+' : ''}
                    {data.prices.quote.USD.percent_change_24h.toFixed(2)}%
                </span>
            </div>
        </div>
        
    )
}
