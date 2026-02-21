import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
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
        setPrice(coin.quotes?.USD.price || '')
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
        <div className="fixed inset-0 md:bg-black md:bg-opacity-80 flex justify-center z-50 md:p-4">
            <div className="mt-16 rounded-lg shadow-lg p-6 md:border md:border-secondary bg-background">
                <h2 className="text-xl font-semibold mb-4">
                    {transaction ? 'Editar ' : 'Añadir '}
                    transacción
                </h2>
                <div className="bg-secondary rounded-lg">
                    <div className="inline-flex w-full items-center gap-4 p-3 px-6">
                        <input
                            type="text"
                            value={searchText}
                            onChange={handleSearchChange}
                            placeholder="Escribe para buscar..."
                            className="w-full text-sm focus:outline-none bg-transparent"
                        />
                        <FaSearch className="w-4 h-4 text-gray-500" />
                    </div>
                    
                    {results && results.length > 0 && (
                        <div className="my-2 rounded-md space-y-3 py-2 max-h-48 overflow-y-auto">
                            {results.map((result) => (
                                <button
                                    key={result.id}
                                    onClick={() => handleSelectCoin(result)}
                                    className="flex text-xs items-center justify-between px-6 w-full"
                                >
                                    <div className="flex items-center gap-2">
                                        <img src={result.logo} alt={result.name} className="w-5 h-5 rounded-full" />
                                        <span>{result.name}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <span>
                                            {result.quotes?.USD.price && `$${cutFirst8Digits(result.quotes?.USD.price)}`}
                                        </span>
                                        <span className={`${result.quotes?.USD.percent_change_24h && result.quotes?.USD.percent_change_24h > 0 ? 'text-positive' : 'text-negative'}`}>   
                                            {result.quotes?.USD.percent_change_24h ? `${result.quotes?.USD.percent_change_24h.toFixed(2)}%` : '0.00%'}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <form className="grid grid-cols-2 gap-4 mt-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-1">
                        <label htmlFor="amount" className="text-sm">Cantidad:</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full rounded-md p-2 text-sm focus:outline-none bg-secondary"
                            placeholder="Cantidad"
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="price" className="text-sm">Precio:</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full rounded-md p-2 text-sm focus:outline-none bg-secondary"
                            placeholder="Precio"
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="datetime" className="text-sm">Fecha:</label>
                        <input
                            type="date"
                            id="datetime"
                            value={datetime}
                            onChange={(e) => setDatetime(e.target.value)}
                            className="w-full rounded-md p-2 text-sm focus:outline-none bg-secondary"
                            placeholder="Fecha"
                        />
                    </div>    

                    <div className="space-y-1">
                        <label htmlFor="coin" className="text-sm">Moneda:</label>
                        <div id="coin" className="w-full rounded-md p-2 text-sm focus:outline-none border border-secondary flex items-center gap-2">
                            {selectedCoin && (
                                <img src={selectedCoin.logo} alt={selectedCoin.symbol} className="w-5 h-5 rounded-full" />
                            )}
                            <span>{selectedCoin?.symbol || 'Selecciona una moneda'}</span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="invested" className="text-sm">Total gastado:</label>
                        <div id="invested" className="w-full rounded-md p-2 focus:outline-none text-lg font-bold border border-secondary flex items-center gap-2">
                            {price ? (
                                <span>
                                    {`$${Number(price) * Number(amount)}`}
                                </span>
                            ) : (
                                <span>0.00</span>
                            )}                            
                        </div>
                    </div>

                </form>

                <div className="flex text-sm justify-end gap-4 mt-4">
                    <button
                        onClick={() => { handleResetForm(); onClose(); }}
                        className="px-4 py-2 border border-primary rounded-md"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleAddTransaction}
                        className="px-4 py-2 bg-primary rounded-md"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
