import { Link, useNavigate } from "react-router-dom"
import { PortfolioItem } from "../../types"
import { cutFirst8Digits, formatMarketCap, formatNumber } from "../../utils";
import { IoIosAddCircle } from "react-icons/io";
import { BiTransfer } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { useTransactionStore } from "../../store/transactions";
import { useState } from "react";
import AddTransaction from "./AddTransaction";

interface PortfolioTableProps {
    portfolio: PortfolioItem[]
}

export default function PortfolioTable({ portfolio } : PortfolioTableProps) {

    const navigate = useNavigate();

    const { removeAllCoinTransactions } = useTransactionStore();

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {portfolio.length === 0 ? (
                <p>No hay transacciones en tu portfolio.</p>
            ) : (           
                <table className="w-full rounded-lg">
                    <thead>
                        <tr className='text-xs border-b border-secondary'>
                            <th className="px-1 md:px-6 py-2 text-left font-light">Moneda</th>                            
                            <th className="px-1 md:px-6 py-2 text-left font-light">Precio</th>
                            <th className="px-1 md:px-6 py-2 text-left font-light hidden md:table-cell">Capitalización de mercado</th>
                            <th className="px-1 md:px-6 py-2 text-left font-light hidden md:table-cell">1h %</th>
                            <th className="px-1 md:px-6 py-2 text-left font-light hidden md:table-cell">24h %</th>
                            <th className="px-1 md:px-6 py-2 text-left font-light hidden md:table-cell">7d %</th>
                            <th className="px-1 md:px-6 py-2 text-right md:text-left font-light">Inversiones</th>
                            <th className="px-1 md:px-6 py-2 text-left font-light hidden md:table-cell">Precio promedio de compra</th>
                            <th className="px-1 md:px-6 py-2 text-left font-light hidden md:table-cell">PNL</th>
                            <th className="px-1 md:px-6 py-2 text-right font-light hidden md:table-cell">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolio.map((portfolioItem) => (
                            <tr key={portfolioItem.coin.id} onClick={() => navigate(`transactions/${portfolioItem.coin.id}`)} className='text-sm hover:bg-secondary transition-colors duration-200 cursor-pointer'>
                                <td className="px-1 md:px-6 py-2 flex items-center gap-2 font-semibold">
                                    <img src={portfolioItem.coin.logo} alt={portfolioItem.coin.name} className="w-6 h-6 rounded-full" />
                                    <div>
                                        <p>{portfolioItem.coin.name}</p>
                                        <p className='text-xs font-light'>{portfolioItem.coin.symbol}</p>
                                    </div>
                                </td>                                
                                <td className="px-1 md:px-6 py-2">
                                    <div>
                                        <p>
                                            {portfolioItem.coin.quotes?.USD.price
                                            ? `$${cutFirst8Digits(portfolioItem.coin.quotes.USD.price)}`
                                            : ''}
                                        </p>
                                        <p className={`md:hidden font-semibold ${portfolioItem.coin.quotes?.USD.percent_change_24h && portfolioItem.coin.quotes?.USD.percent_change_24h > 0 ? "text-positive" : "text-negative"}`}>
                                            {portfolioItem.coin.quotes?.USD.percent_change_24h 
                                            ? `${formatNumber(portfolioItem.coin.quotes.USD.percent_change_24h.toFixed(2))}%`
                                            : ""}
                                        </p>
                                    </div>                                    
                                </td>
                                <td className="px-1 md:px-6 py-2 hidden md:table-cell">
                                    {portfolioItem.coin.quotes?.USD.market_cap &&
                                        formatMarketCap(portfolioItem.coin.quotes?.USD.market_cap)
                                    }
                                </td>
                                <td className={`px-1 md:px-6 py-2 hidden md:table-cell ${
                                        portfolioItem.coin.quotes?.USD.percent_change_1h && portfolioItem.coin.quotes?.USD.percent_change_1h > 0 ? "text-positive" : "text-negative"
                                }`}>
                                    {portfolioItem.coin.quotes?.USD.percent_change_1h 
                                        ? `${formatNumber(portfolioItem.coin.quotes.USD.percent_change_1h.toFixed(2))}%`
                                        : ""}
                                </td>
                                <td className={`px-1 md:px-6 py-2 hidden md:table-cell ${
                                        portfolioItem.coin.quotes?.USD.percent_change_24h && portfolioItem.coin.quotes?.USD.percent_change_24h > 0 ? "text-positive" : "text-negative"
                                }`}>
                                    {portfolioItem.coin.quotes?.USD.percent_change_24h 
                                        ? `${formatNumber(portfolioItem.coin.quotes.USD.percent_change_24h.toFixed(2))}%`
                                        : ""}
                                </td>
                                <td className={`px-1 md:px-6 py-2 hidden md:table-cell ${
                                        portfolioItem.coin.quotes?.USD.percent_change_7d && portfolioItem.coin.quotes?.USD.percent_change_7d > 0 ? "text-positive" : "text-negative"
                                }`}>
                                    {portfolioItem.coin.quotes?.USD.percent_change_7d 
                                        ? `${formatNumber(portfolioItem.coin.quotes.USD.percent_change_7d.toFixed(2))}%`
                                        : ""}
                                </td>
                                <td className="px-1 md:px-6 py-2 hidden md:table-cell">
                                    <p className='font-semibold'>${portfolioItem.totalInvested.toFixed(2)}</p>
                                    <p className="text-xs">{portfolioItem.amount.toFixed(2)} {portfolioItem.coin.symbol}</p>
                                </td>
                                <td className="px-1 md:px-6 py-2 hidden md:table-cell">{cutFirst8Digits(portfolioItem.averagePrice)}$</td>
                                <td className="px-1 md:px-6 py-2 text-right md:text-left">
                                    <div>
                                        <p>{portfolioItem.totalValue.toFixed(2)}$</p>
                                        <p className={`font-bold ${portfolioItem.totalValue - portfolioItem.totalInvested > 0 ? 'text-positive' : 'text-negative'}`}>
                                            {`${(portfolioItem.totalValue - portfolioItem.totalInvested).toFixed(2)}$`}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-1 md:px-6 py-2 text-right hidden md:table-cell">
                                    <div className='flex items-center gap-2 justify-end'>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpen();
                                            }}
                                            className="bg-secondary rounded-md px-4 py-2 hover:bg-primary transition-colors duration-200"
                                        >
                                            <IoIosAddCircle />
                                        </button>
                                        <Link to={`transactions/${portfolioItem.coin.id}`} className='bg-secondary rounded-md px-4 py-2 hover:bg-primary transition-colors duration-200'>
                                            <BiTransfer />
                                        </Link>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeAllCoinTransactions(portfolioItem.coin.id);
                                            }}
                                            className="bg-secondary rounded-md px-4 py-2 hover:bg-primary transition-colors duration-200"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <AddTransaction isOpen={isOpen} onClose={() => handleOpen()} onConfirm={() => handleOpen()} transaction={null} />

        </div>
    )
}
