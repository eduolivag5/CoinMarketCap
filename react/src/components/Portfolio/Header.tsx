import { PortfolioItem } from "../../types";

interface HeaderProps {
    portfolio: PortfolioItem[];
}

export default function Header({ portfolio }: HeaderProps) {

    // Calcular suma de totalInvested y totalValue
    const totalInvested = portfolio.length > 0 ? portfolio.reduce((sum, item) => sum + item.totalInvested, 0) : 0;
    const totalValue = portfolio.length > 0 ? portfolio.reduce((sum, item) => sum + item.totalValue, 0) : 0;
    const profit = totalValue - totalInvested;

    // Encontrar el mejor y peor PortfolioItem
    const bestPortfolioItem = portfolio.length > 0
        ? portfolio.reduce((best, item) => {
            const currentProfit = item.totalValue - item.totalInvested;
            const bestProfit = best ? best.totalValue - best.totalInvested : -Infinity;
            return currentProfit > bestProfit ? item : best;
        }, null as PortfolioItem | null)
        : null;

    const worstPortfolioItem = portfolio.length > 0
        ? portfolio.reduce((worst, item) => {
            const currentProfit = item.totalValue - item.totalInvested;
            const worstProfit = worst ? worst.totalValue - worst.totalInvested : Infinity;
            return currentProfit < worstProfit ? item : worst;
        }, null as PortfolioItem | null)
        : null;

    return (
        <div>
            <div className="md:hidden">
                <p className="text-2xl font-bold">{totalValue.toFixed(2)}$</p>
                <p className={`font-bold text-lg ${profit > 0 ? 'text-positive' : 'text-negative'}`}>
                    {profit > 0 && '+'}
                    {profit.toFixed(2)}$ 
                    <span className="text-base font-normal">
                        &nbsp; ({profit > 0 && '+'}{(profit / totalInvested * 100).toFixed(2)}%)
                    </span>
                </p>
            </div>
            <div className="flex-wrap gap-4 hidden md:flex">
                <div className="border border-secondary p-4 rounded-md space-y-1 flex-1">
                    <p className="text-sm">Beneficio histórico</p>
                    <p className={`font-bold text-xl ${totalValue - totalInvested > 0 ? 'text-positive' : 'text-negative'}`}>
                        {totalValue - totalInvested > 0 && '+'}
                        {`${(totalValue - totalInvested).toFixed(2)}$`}
                    </p>
                    <span className={`font-medium text-sm ${profit > 0 ? 'text-positive' : 'text-negative'}`}>
                        {profit > 0 && '+'}{(profit / totalInvested * 100).toFixed(2)}%
                    </span>
                </div>
                <div className="border border-secondary p-4 rounded-md space-y-1 flex-1">
                    <p className="text-sm">Coste base</p>
                    <p className="font-bold text-lg">
                        {totalInvested.toFixed(2)}$
                    </p>
                </div>
                <div className="border border-secondary p-4 rounded-md space-y-1 flex-1">
                    <p className="text-sm">Tenencia actual</p>
                    <p className="font-bold text-lg">
                        {totalValue.toFixed(2)}$
                    </p>
                </div>
                {bestPortfolioItem && (
                    <div className="border border-secondary p-4 rounded-md space-y-1 flex-1">
                        <p className="text-sm">Best performer</p>
                        <div>
                            <div className="flex items-center gap-2 font-semibold text-lg">
                                <img src={bestPortfolioItem.coin.logo} alt={bestPortfolioItem.coin.name} className="w-6 h-6 rounded-full" />
                                <p>{bestPortfolioItem.coin.symbol}</p>
                            </div>
                            <p className={`font-bold text-base ${bestPortfolioItem.totalValue - bestPortfolioItem.totalInvested > 0 ? 'text-positive' : 'text-negative'}`}>
                                {bestPortfolioItem.totalValue - bestPortfolioItem.totalInvested > 0 && '+'}
                                {`${(bestPortfolioItem.totalValue - bestPortfolioItem.totalInvested).toFixed(2)}$`}
                            </p>
                        </div>
                    </div>
                )}
                {worstPortfolioItem && (
                    <div className="border border-secondary p-4 rounded-md space-y-1 flex-1">
                        <p className="text-sm">Worst performer</p>
                        <div>
                            <div className="flex items-center gap-2 font-semibold text-lg">
                                <img src={worstPortfolioItem.coin.logo} alt={worstPortfolioItem.coin.name} className="w-6 h-6 rounded-full" />
                                <p>{worstPortfolioItem.coin.symbol}</p>
                            </div>
                            <p className={`font-bold text-base ${worstPortfolioItem.totalValue - worstPortfolioItem.totalInvested > 0 ? 'text-positive' : 'text-negative'}`}>
                                {worstPortfolioItem.totalValue - worstPortfolioItem.totalInvested > 0 && '+'}
                                {`${(worstPortfolioItem.totalValue - worstPortfolioItem.totalInvested).toFixed(2)}$`}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
