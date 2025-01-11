import { useState } from "react";
import { CategoryType } from "../../types";
import { formatNumber } from "../../utils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface CategoriesTableProps {
    categories: CategoryType[];
}

export default function CategoriesTable({ categories }: CategoriesTableProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortColumn, setSortColumn] = useState<string>("num_tokens");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const itemsPerPage = 20;

    // Filtrar por nombre de categoría
    const filteredCategories = categories.filter(category =>
        category.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ordenar categorías
    const sortedCategories = [...filteredCategories].sort((a, b) => {
        const aValue = a[sortColumn as keyof CategoryType];
        const bValue = b[sortColumn as keyof CategoryType];

        if (typeof aValue === "number" && typeof bValue === "number") {
            return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === "string" && typeof bValue === "string") {
            return sortOrder === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        return 0;
    });

    // Obtener categorías para la página actual
    const paginatedCategories = sortedCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    // Cambiar la columna de ordenación
    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const navigate = useNavigate();

    return (
        <div className="w-full">
            {/* Paginación */}
            <div className="my-4 flex gap-2">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar categoría..."
                    className="flex-grow py-2 px-4 text-sm rounded bg-secondary focus:outline-none"
                />

                <div className="flex gap-1">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="px-4 py-2 rounded bg-secondary"
                        disabled={currentPage === 1}
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 text-sm font-bold hidden md:block">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="px-4 py-2 rounded bg-secondary"
                        disabled={currentPage === totalPages}
                    >
                        <FaChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>


            {/* Tabla */}
            <table className="w-full md:table-fixed">
                <thead className="text-xs font-semilight border-b border-secondary">
                    <tr>
                        <td
                            onClick={() => handleSort("title")}
                            className="px-1 md:px-4 py-3 cursor-pointer"
                        >
                            Nombre {sortColumn === "title" && (sortOrder === "asc" ? "↑" : "↓")}
                        </td>
                        <td className="px-1 md:px-4 py-3 hidden lg:table-cell">
                            Descripción
                        </td>
                        <td
                            onClick={() => handleSort("market_cap")}
                            className="px-1 md:px-4 py-3 cursor-pointer hidden md:table-cell"
                        >
                            Capitalización de mercado {sortColumn === "market_cap" && (sortOrder === "asc" ? "↑" : "↓")}
                        </td>
                        <td
                            onClick={() => handleSort("volume")}
                            className="px-1 md:px-4 py-3 cursor-pointer hidden md:table-cell"
                        >
                            Volumen 24h {sortColumn === "volume" && (sortOrder === "asc" ? "↑" : "↓")}
                        </td>
                        <td
                            onClick={() => handleSort("num_tokens")}
                            className="px-1 md:px-4 py-3 cursor-pointer hidden md:table-cell"
                        >
                            Tokens {sortColumn === "num_tokens" && (sortOrder === "asc" ? "↑" : "↓")}
                        </td>
                        <td
                            onClick={() => handleSort("avg_price_change")}
                            className="px-1 md:px-4 py-3 cursor-pointer text-right md:text-left"
                        >
                            Cambio 24h {sortColumn === "avg_price_change" && (sortOrder === "asc" ? "↑" : "↓")}
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCategories.map((category) => (
                        <tr
                            key={category.id}
                            onClick={() => navigate(`/categories/${category.id}`)}
                            className="font-semibold text-xs hover:bg-secondary transition-colors duration-200 cursor-pointer"
                        >
                            <td className="px-1 md:px-4 py-3 md:py-4 text-sm md:text-xs line-clamp-2">{category.name}</td>
                            <td className="px-1 md:px-4 py-3 md:py-4 line-clamp-2 hidden lg:table-cell">{category.title}</td>
                            <td className="px-1 md:px-4 py-3 md:py-4 hidden md:table-cell">{formatNumber(category.market_cap)}</td>
                            <td className="px-1 md:px-4 py-3 md:py-4 hidden md:table-cell">{formatNumber(category.volume)}</td>
                            <td className="px-1 md:px-4 py-3 md:py-4 hidden md:table-cell">{formatNumber(category.num_tokens)}</td>
                            <td className={`px-1 md:px-4 py-3 md:py-4 text-sm md:text-xs ${
                                    category.avg_price_change && category.avg_price_change > 0 ? "text-positive" : "text-negative"
                                } text-right md:text-left`}
                            >
                                {category.avg_price_change?.toFixed(2)}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
        </div>
    );
}
