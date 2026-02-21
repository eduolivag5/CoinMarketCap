import { useNavigate } from "react-router-dom";
import useWatchlistStore from "../store/watchlist";
import { FaRegStar, FaStar } from "react-icons/fa";
import { formatNumber } from "../utils";
import { CryptoPrincipalDataType } from "../types";
import { useState } from "react";

interface CoinsTableProps {
    data: CryptoPrincipalDataType[];
}

export default function CoinsTable({ data }: CoinsTableProps) {
    const navigate = useNavigate();
    const { watchlist, addCoin, removeCoin } = useWatchlistStore();

    const [sortColumn, setSortColumn] = useState<string>("marketcap");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");     

    const columnKeyMap: Record<string, keyof CryptoPrincipalDataType | string> = {
        cmc_rank: "cmc_rank",
        name: "name",
        price: "quote.USD.price",
        "1h": "quote.USD.percent_change_1h",
        "24h": "quote.USD.percent_change_24h",
        "7d": "quote.USD.percent_change_7d",
        marketcap: "quote.USD.market_cap",
        volume: "quote.USD.volume_24h",
    };

    // Función para acceder a propiedades anidadas
    const getNestedValue = (obj: any, path: string) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    const sortedCoins = [...data].sort((a, b) => {
        const aValue = getNestedValue(a, columnKeyMap[sortColumn] as string);
        const bValue = getNestedValue(b, columnKeyMap[sortColumn] as string);

        if (typeof aValue === "number" && typeof bValue === "number") {
            return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === "string" && typeof bValue === "string") {
            return sortOrder === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        return 0;
    });

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const handleAddToWatchlist = (coinId: number) => {
        if (!watchlist.includes(coinId)) {
            addCoin(coinId);
        } else {
            removeCoin(coinId);
        }
    };

    return (
        <table className="w-full">
            <thead className="text-xs border-b border-secondary">
                <tr>
                    <td className="px-2 md:pl-4 py-1"></td>
                    <td
                        className="px-1 md:px-6 py-1 text-gray-400 font-medium cursor-pointer"
                        onClick={() => handleSort("marketcap")}
                    >
                        #
                    </td>
                    <td
                        className="px-1 md:px-6 py-1 text-gray-400 font-medium cursor-pointer"
                        onClick={() => handleSort("name")}
                    >
                        Nombre {sortColumn === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                    </td>
                    <td
                        className="px-1 md:px-6 py-1 text-gray-400 font-medium cursor-pointer"
                        onClick={() => handleSort("price")}
                    >
                        Precio {sortColumn === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                    </td>
                    <td
                        className="px-1 md:px-6 py-1 text-gray-400 font-medium cursor-pointer hidden md:table-cell"
                        onClick={() => handleSort("1h")}
                    >
                        1h % {sortColumn === "1h" && (sortOrder === "asc" ? "↑" : "↓")}
                    </td>
                    <td
                        className="px-1 md:px-6 py-1 text-gray-400 text-right md:text-left font-medium cursor-pointer"
                        onClick={() => handleSort("24h")}
                    >
                        24h % {sortColumn === "24h" && (sortOrder === "asc" ? "↑" : "↓")}
                    </td>
                    <td
                        className="px-1 md:px-6 py-1 text-gray-400 font-medium cursor-pointer hidden md:table-cell"
                        onClick={() => handleSort("7d")}
                    >
                        7d % {sortColumn === "7d" && (sortOrder === "asc" ? "↑" : "↓")}
                    </td>
                    <td
                        className="px-1 md:px-6 py-1 text-gray-400 font-medium cursor-pointer hidden md:table-cell"
                        onClick={() => handleSort("marketcap")}
                    >
                        Capitalización de mercado {sortColumn === "marketcap" && (sortOrder === "asc" ? "↑" : "↓")}
                    </td>
                    <td
                        className="px-1 md:px-6 py-1 text-gray-400 font-medium cursor-pointer hidden md:table-cell"
                        onClick={() => handleSort("volume")}
                    >
                        Volumen (24h) {sortColumn === "volume" && (sortOrder === "asc" ? "↑" : "↓")}
                    </td>
                </tr>
            </thead>
            <tbody>
                {sortedCoins.map((coin) => (
                    <tr
                        onClick={() => navigate(`/details/${coin.id}`)}
                        key={coin.id}
                        className="font-medium text-xs md:text-sm hover:bg-secondary transition-colors duration-200 cursor-pointer"
                    >
                        <td className="px-2 py-3 md:py-4">
                            <button
                                className={`flex items-center gap-2 hover:text-primary focus:text-primary transition-colors duration-200 ${
                                    watchlist.includes(coin.id) && "text-primary"
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToWatchlist(coin.id);
                                }}
                            >
                                {watchlist.includes(coin.id) ? (
                                    <FaStar className="w-3 h-3 hover:text-primary transition-colors duration-200 cursor-pointer" />
                                ) : (
                                    <FaRegStar className="w-3 h-3 hover:text-primary transition-colors duration-200 cursor-pointer" />
                                )}
                            </button>
                        </td>
                        <td className="px-1 md:px-6 py-3 md:py-4 font-bold">{coin.cmc_rank}</td>
                        <td className="px-1 md:px-6 py-3 md:py-4 font-semibold flex items-center gap-4">
                            <img src={coin.logo} alt={coin.name} className="w-8 h-8 rounded-full" />
                            <div>
                                <p className="line-clamp-1">{coin.name}</p>
                                <p className="font-light text-xs">{coin.symbol}</p>
                            </div>
                        </td>
                        <td className="px-1 md:px-6 py-3 md:py-4 font-semibold">
                            {coin.quote.USD.price 
                                ? `$${formatNumber(coin.quote.USD.price.toString().slice(0, 8))}`
                                : ""}
                        </td>
                        <td
                            className={`px-1 md:px-6 py-3 md:py-4 hidden md:table-cell ${
                                coin.quote.USD.percent_change_1h > 0 ? "text-positive" : "text-negative"
                            }`}
                        >
                            {coin.quote.USD.percent_change_1h 
                                ? `${formatNumber(coin.quote.USD.percent_change_1h.toFixed(2))}%`
                                : ""}
                        </td>
                        <td
                            className={`px-1 md:px-6 py-3 md:py-4 text-right md:text-left ${
                                coin.quote.USD.percent_change_24h > 0 ? "text-positive" : "text-negative"
                            }`}
                        >
                            {coin.quote.USD.percent_change_24h 
                                ? `${formatNumber(coin.quote.USD.percent_change_24h.toFixed(2))}%`
                                : ""}
                        </td>
                        <td
                            className={`px-1 md:px-6 py-3 md:py-4 hidden md:table-cell ${
                                coin.quote.USD.percent_change_7d > 0 ? "text-positive" : "text-negative"
                            }`}
                        >
                            {coin.quote.USD.percent_change_7d
                                ? `${formatNumber(coin.quote.USD.percent_change_7d.toFixed(2))}%`
                                : ""}
                        </td>
                        <td className="px-1 md:px-6 py-3 md:py-4 hidden md:table-cell">
                            {coin.quote.USD.market_cap 
                                ? `${formatNumber(coin.quote.USD.market_cap.toFixed(0))}`
                                : ""}
                        </td>
                        <td className="px-1 md:px-6 py-3 md:py-4 hidden md:table-cell">
                            {coin.quote.USD.volume_24h 
                                ? `${formatNumber(coin.quote.USD.volume_24h.toFixed(0))}`
                                : ""}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
