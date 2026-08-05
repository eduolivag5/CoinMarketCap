import { useNavigate } from "react-router-dom"
import { PortfolioItem } from "../../types"
import { cutFirst8Digits, formatMarketCap, formatNumber } from "../../utils";
import { IoIosAddCircle } from "react-icons/io";
import { BiTransfer } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { HiOutlineWallet } from "react-icons/hi2";
import { useTransactionStore } from "../../store/transactions";
import { useState } from "react";
import AddTransaction from "./AddTransaction";

interface PortfolioTableProps {
    portfolio: PortfolioItem[]
}

export default function PortfolioTable({ portfolio }: PortfolioTableProps) {
    const navigate = useNavigate();
    const { removeAllCoinTransactions } = useTransactionStore();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full">
            {portfolio.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-secondary/10 space-y-3 my-6">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/30 flex items-center justify-center text-primary shadow-sm">
                        <HiOutlineWallet className="w-7 h-7 opacity-70" />
                    </div>
                    <div className="space-y-1">
                        <p className="font-bold text-base">No hay transacciones en tu portfolio</p>
                        <p className="text-xs opacity-60 font-medium">Añade activos para comenzar a monitorizar tus inversiones.</p>
                    </div>
                </div>
            ) : ( 
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className='text-xs uppercase tracking-wider opacity-50 border-b border-secondary/40'>
                                <th className="px-4 md:px-5 py-3 text-left font-bold">Moneda</th>                           
                                <th className="px-4 md:px-5 py-3 text-left font-bold">Precio</th>
                                <th className="px-4 md:px-5 py-3 text-left font-bold hidden md:table-cell">Capitalización</th>
                                <th className="px-4 md:px-5 py-3 text-left font-bold hidden md:table-cell">1h %</th>
                                <th className="px-4 md:px-5 py-3 text-left font-bold hidden md:table-cell">24h %</th>
                                <th className="px-4 md:px-5 py-3 text-left font-bold hidden md:table-cell">7d %</th>
                                <th className="px-4 md:px-5 py-3 text-right md:text-left font-bold">Inversión / Cantidad</th>
                                <th className="px-4 md:px-5 py-3 text-left font-bold hidden md:table-cell">Precio Compra</th>
                                <th className="px-4 md:px-5 py-3 text-right font-bold">Valor / PNL</th>
                                <th className="px-4 md:px-5 py-3 text-right font-bold hidden md:table-cell">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary/20">
                            {portfolio.map((portfolioItem) => {
                                const pnl = portfolioItem.totalValue - portfolioItem.totalInvested;
                                const isPositivePnl = pnl >= 0;

                                return (
                                    <tr 
                                        key={portfolioItem.coin.id} 
                                        onClick={() => navigate(`transactions/${portfolioItem.coin.id}`)} 
                                        className='text-sm group hover:bg-secondary/15 transition-colors duration-200 cursor-pointer'
                                    >
                                        <td className="px-4 md:px-5 py-4 flex items-center gap-3">
                                            <img 
                                                src={portfolioItem.coin.logo} 
                                                alt={portfolioItem.coin.name} 
                                                className="w-8 h-8 rounded-full bg-secondary/20 p-0.5 shadow-sm" 
                                            />
                                            <div>
                                                <p className="font-bold tracking-tight">{portfolioItem.coin.name}</p>
                                                <p className='text-xs uppercase opacity-55 font-semibold'>{portfolioItem.coin.symbol}</p>
                                            </div>
                                        </td>                            
                                        
                                        <td className="px-4 md:px-5 py-4">
                                            <div>
                                                <p className="font-bold">
                                                    {portfolioItem.coin.quotes?.USD.price
                                                        ? `$${cutFirst8Digits(portfolioItem.coin.quotes.USD.price)}`
                                                        : ''}
                                                </p>
                                                <p className={`md:hidden text-xs font-bold ${portfolioItem.coin.quotes?.USD.percent_change_24h && portfolioItem.coin.quotes?.USD.percent_change_24h > 0 ? "text-positive" : "text-negative"}`}>
                                                    {portfolioItem.coin.quotes?.USD.percent_change_24h 
                                                        ? `${formatNumber(portfolioItem.coin.quotes.USD.percent_change_24h.toFixed(2))}%`
                                                        : ""}
                                                </p>
                                            </div>                           
                                        </td>

                                        <td className="px-4 md:px-5 py-4 hidden md:table-cell text-xs font-medium opacity-80">
                                            {portfolioItem.coin.quotes?.USD.market_cap &&
                                                formatMarketCap(portfolioItem.coin.quotes?.USD.market_cap)
                                            }
                                        </td>

                                        <td className={`px-4 md:px-5 py-4 hidden md:table-cell text-xs font-bold ${
                                            portfolioItem.coin.quotes?.USD.percent_change_1h && portfolioItem.coin.quotes?.USD.percent_change_1h > 0 ? "text-positive" : "text-negative"
                                        }`}>
                                            {portfolioItem.coin.quotes?.USD.percent_change_1h 
                                                ? `${formatNumber(portfolioItem.coin.quotes.USD.percent_change_1h.toFixed(2))}%`
                                                : ""}
                                        </td>

                                        <td className={`px-4 md:px-5 py-4 hidden md:table-cell text-xs font-bold ${
                                            portfolioItem.coin.quotes?.USD.percent_change_24h && portfolioItem.coin.quotes?.USD.percent_change_24h > 0 ? "text-positive" : "text-negative"
                                        }`}>
                                            {portfolioItem.coin.quotes?.USD.percent_change_24h 
                                                ? `${formatNumber(portfolioItem.coin.quotes.USD.percent_change_24h.toFixed(2))}%`
                                                : ""}
                                        </td>

                                        <td className={`px-4 md:px-5 py-4 hidden md:table-cell text-xs font-bold ${
                                            portfolioItem.coin.quotes?.USD.percent_change_7d && portfolioItem.coin.quotes?.USD.percent_change_7d > 0 ? "text-positive" : "text-negative"
                                        }`}>
                                            {portfolioItem.coin.quotes?.USD.percent_change_7d 
                                                ? `${formatNumber(portfolioItem.coin.quotes.USD.percent_change_7d.toFixed(2))}%`
                                                : ""}
                                        </td>

                                        <td className="px-4 md:px-5 py-4 text-right md:text-left">
                                            <p className='font-bold'>${portfolioItem.totalInvested.toFixed(2)}</p>
                                            <p className="text-xs opacity-60 font-medium">{portfolioItem.amount.toFixed(2)} {portfolioItem.coin.symbol}</p>
                                        </td>

                                        <td className="px-4 md:px-5 py-4 hidden md:table-cell font-medium opacity-80 text-xs">
                                            {cutFirst8Digits(portfolioItem.averagePrice)}$
                                        </td>

                                        <td className="px-4 md:px-5 py-4 text-right">
                                            <div>
                                                <p className="font-bold">${portfolioItem.totalValue.toFixed(2)}</p>
                                                <p className={`text-xs font-bold ${isPositivePnl ? 'text-positive' : 'text-negative'}`}>
                                                    {isPositivePnl ? `+$${pnl.toFixed(2)}` : `-$${Math.abs(pnl).toFixed(2)}`}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-4 md:px-5 py-4 text-right hidden md:table-cell">
                                            <div className='flex items-center gap-1.5 justify-end'>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOpen();
                                                    }}
                                                    className="w-9 h-9 rounded-xl bg-secondary/30 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                                                    title="Añadir transacción"
                                                >
                                                    <IoIosAddCircle className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`transactions/${portfolioItem.coin.id}`);
                                                    }}
                                                    className="w-9 h-9 rounded-xl bg-secondary/30 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                                                    title="Ver transacciones"
                                                >
                                                    <BiTransfer className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeAllCoinTransactions(portfolioItem.coin.id);
                                                    }}
                                                    className="w-9 h-9 rounded-xl bg-secondary/30 hover:bg-negative hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                                                    title="Eliminar todo"
                                                >
                                                    <FaTrash className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            <AddTransaction isOpen={isOpen} onClose={() => handleOpen()} onConfirm={() => handleOpen()} transaction={null} />
        </div>
    )
}