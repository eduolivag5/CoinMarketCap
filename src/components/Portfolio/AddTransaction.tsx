import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { searchCoins } from "../../api/coins";
import { SearchItemType } from "../../types";
import { useTransactionStore } from "../../store/transactions";
import { v4 as uuidv4 } from 'uuid';
import { cutFirst8Digits } from "../../utils";

interface AddTransactionProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    transaction: any;  
}

export default function AddTransaction({ isOpen, onClose, onConfirm, transaction }: AddTransactionProps) {
    const { addTransaction, editTransaction } = useTransactionStore();

    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState<SearchItemType[] | undefined>([]);
    const [selectedCoin, setSelectedCoin] = useState<SearchItemType | undefined>(undefined);
    const [amount, setAmount] = useState<number | string>('');
    const [price, setPrice] = useState<number | string>('');
    const [datetime, setDatetime] = useState<string>('');
    const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);    

    useEffect(() => {
        if (transaction) {
            setSelectedCoin(transaction.coin);
            setAmount(transaction.amount.toString());
            setPrice(transaction.price.toString());
            setDatetime(transaction.date);
            setSearchText(transaction.coin?.symbol || '');
        }
    }, [transaction]);

    const mutation = useMutation({
        mutationKey: ['search', searchText],  
        mutationFn: async (query: string) => searchCoins(query),
        onSuccess: (data) => setResults(data),
        onError: (error) => console.error('Error al buscar:', error),
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchText(query);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        if (query.length >= 2) {
            const timeout = setTimeout(() => mutation.mutate(query), 500);
            setDebounceTimeout(timeout);
        } else {
            setResults([]);
        }
    };

    const handleSelectCoin = (coin: SearchItemType) => {
        setSelectedCoin(coin);
        setSearchText(coin.symbol || '');
        setPrice(coin.quotes?.USD.price || '');
        setResults([]);
    };

    const handleAddTransaction = () => {
        if (selectedCoin && amount && price && datetime) {
            const newTransaction = {
                id: uuidv4(), 
                amount: Number(amount),
                price: Number(price),
                date: datetime,
                coin: selectedCoin
            };

            if (transaction && transaction.id) {
                editTransaction(transaction.id, newTransaction); 
            } else {
                addTransaction(newTransaction); 
            }
            handleResetForm(); 
            onConfirm(); 
        }
    };

    const handleResetForm = () => {
        setSearchText('');
        setResults([]);
        setSelectedCoin(undefined);
        setAmount('');
        setPrice('');
        setDatetime('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-lg rounded-3xl shadow-2xl p-6 md:p-8 bg-background border border-secondary/20 space-y-6 animate-in fade-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">
                            {transaction ? 'Editar transacción' : 'Añadir transacción'}
                        </h2>
                        <p className="text-xs opacity-60 font-medium mt-0.5">
                            Gestiona los detalles de tu activo e inversión.
                        </p>
                    </div>
                    <button
                        onClick={() => { handleResetForm(); onClose(); }}
                        className="w-9 h-9 rounded-2xl bg-secondary/20 hover:bg-secondary/40 flex items-center justify-center transition-all duration-200"
                    >
                        <IoClose className="w-5 h-5 opacity-70" />
                    </button>
                </div>

                {/* Buscador de Moneda */}
                <div className="space-y-2 relative">
                    <label className="text-xs font-bold uppercase tracking-wider opacity-60">Buscar Moneda</label>
                    <div className="relative flex items-center bg-secondary/20 rounded-2xl px-4 py-3 border border-transparent focus-within:border-primary/50 transition-colors">
                        <FaSearch className="w-4 h-4 opacity-40 mr-3" />
                        <input
                            type="text"
                            value={searchText}
                            onChange={handleSearchChange}
                            placeholder="Busca por nombre o símbolo (ej. Bitcoin, BTC)..."
                            className="w-full text-sm focus:outline-none bg-transparent font-medium border-none ring-0 outline-none placeholder:text-secondary-foreground/40"
                        />
                    </div>
                    
                    {results && results.length > 0 && (
                        <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-background shadow-xl space-y-1 p-2 max-h-56 overflow-y-auto z-20 backdrop-blur-md">
                            {results.map((result) => (
                                <button
                                    key={result.id}
                                    onClick={() => handleSelectCoin(result)}
                                    className="flex text-xs items-center justify-between px-4 py-2.5 w-full hover:bg-secondary/20 rounded-xl transition-colors text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <img src={result.logo} alt={result.name} className="w-7 h-7 rounded-full bg-secondary/30 p-0.5" />
                                        <div>
                                            <p className="font-bold">{result.name}</p>
                                            <p className="text-[10px] uppercase opacity-50 font-semibold">{result.symbol}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="text-right">
                                        <p className="font-bold">
                                            {result.quotes?.USD.price && `$${cutFirst8Digits(result.quotes?.USD.price)}`}
                                        </p>
                                        <p className={`font-bold ${result.quotes?.USD.percent_change_24h && result.quotes?.USD.percent_change_24h > 0 ? 'text-positive' : 'text-negative'}`}> 
                                            {result.quotes?.USD.percent_change_24h ? `${result.quotes?.USD.percent_change_24h.toFixed(2)}%` : '0.00%'}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Formulario de Inputs */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-1.5">
                        <label htmlFor="amount" className="text-xs font-bold uppercase tracking-wider opacity-60">Cantidad:</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full rounded-2xl p-3 text-sm focus:outline-none bg-secondary/20 border-none outline-none ring-0 focus:ring-1 focus:ring-primary/50 transition-colors font-medium [color-scheme:dark] placeholder:text-secondary-foreground/40"
                            placeholder="0.00"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="price" className="text-xs font-bold uppercase tracking-wider opacity-60">Precio unitario ($):</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full rounded-2xl p-3 text-sm focus:outline-none bg-secondary/20 border-none outline-none ring-0 focus:ring-1 focus:ring-primary/50 transition-colors font-medium [color-scheme:dark] placeholder:text-secondary-foreground/40"
                            placeholder="0.00"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="datetime" className="text-xs font-bold uppercase tracking-wider opacity-60">Fecha:</label>
                        <input
                            type="date"
                            id="datetime"
                            value={datetime}
                            onChange={(e) => setDatetime(e.target.value)}
                            className="w-full rounded-2xl p-3 text-sm focus:outline-none bg-secondary/20 border-none outline-none ring-0 focus:ring-1 focus:ring-primary/50 transition-colors font-medium [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                        />
                    </div>    

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider opacity-60">Moneda seleccionada:</label>
                        <div className="w-full rounded-2xl p-2.5 text-sm border-none bg-secondary/10 flex items-center gap-3">
                            {selectedCoin ? (
                                <>
                                    <img src={selectedCoin.logo} alt={selectedCoin.symbol} className="w-7 h-7 rounded-full bg-secondary/30 p-0.5" />
                                    <div>
                                        <p className="font-bold leading-tight">{selectedCoin.name}</p>
                                        <p className="text-[10px] uppercase opacity-50 font-semibold">{selectedCoin.symbol}</p>
                                    </div>
                                </>
                            ) : (
                                <span className="text-xs opacity-50 font-medium px-2">Ninguna seleccionada</span>
                            )}
                        </div>
                    </div>

                    <div className="col-span-full space-y-1.5 pt-2">
                        <label className="text-xs font-bold uppercase tracking-wider opacity-60">Total gastado (Inversión)</label>
                        <div className="w-full rounded-2xl px-4 py-3 bg-secondary/30 border-none flex items-center justify-between">
                            <span className="text-xs opacity-60 font-medium">Cálculo automático</span>
                            <span className="text-lg font-bold tracking-tight">
                                {price && amount ? `$${(Number(price) * Number(amount)).toFixed(2)}` : '$0.00'}
                            </span>
                        </div>
                    </div>
                </form>

                {/* Botones de Acción */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        onClick={() => { handleResetForm(); onClose(); }}
                        className="px-5 py-2.5 rounded-2xl font-bold text-xs bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 border-none"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleAddTransaction}
                        className="px-6 py-2.5 rounded-2xl font-bold text-xs bg-primary text-white hover:opacity-90 transition-all duration-200 shadow-md shadow-primary/25 border-none"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}