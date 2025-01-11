import { useState } from 'react';
import AddTransaction from './AddTransaction';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Transaction, useTransactionStore } from '../../store/transactions';
import { cutFirst8Digits } from '../../utils';

export default function TransactionsTable({ transactions } : { transactions: Transaction[] }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);    

    const { removeTransaction } = useTransactionStore();
    
    const handleRemoveTransaction = (id: string) => {
        removeTransaction(id);
    };    

    const handleOpen = (transaction: Transaction | null = null) => {
        setSelectedTransaction(transaction);
        setIsOpen(!isOpen);
    };

    return (
        <div>    
            {transactions.length === 0 ? (
                <p>No hay transacciones.</p>
            ) : (
                <table className="w-full rounded-lg">
                    <thead>
                        <tr className='text-xs border-b border-secondary'>
                            <th className="px-4 py-2 text-left font-light">Moneda</th>
                            <th className="px-4 py-2 text-right md:text-left font-light">Cantidad</th>
                            <th className="px-4 py-2 text-left font-light hidden md:table-cell">Precio</th>
                            <th className="px-4 py-2 text-left font-light hidden md:table-cell">Gastado</th>
                            <th className="px-4 py-2 text-left font-light hidden md:table-cell">Fecha</th>
                            <th className="px-4 py-2 text-right font-light hidden md:table-cell">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className='text-sm'>
                                <td className="px-4 py-2 flex items-center gap-2">
                                    <img src={transaction.coin.logo} alt={transaction.coin.name} className="w-6 h-6 rounded-full" />
                                    <div className="flex flex-col">
                                        <span className='font-semibold'>{transaction.coin.name}</span>
                                        <span className='text-xs'>{transaction.coin.symbol}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-right md:text-left">
                                    <p className='font-semibold'>{transaction.amount} {transaction.coin.symbol}</p>
                                    <p className='text-xs md:hidden'>${(transaction.price * transaction.amount).toFixed(2)}</p>
                                </td>
                                <td className="px-4 py-2 hidden md:table-cell">${cutFirst8Digits(transaction.price)}</td>
                                <td className="px-4 py-2 hidden md:table-cell">${(transaction.price * transaction.amount).toFixed(2)}</td>	
                                <td className="px-4 py-2 hidden md:table-cell">{transaction.date}</td>
                                <td className="px-4 py-2 text-right hidden md:table-cell">
                                    <div className='flex items-center gap-2 justify-end'>
                                        <button
                                            onClick={() => handleOpen(transaction)}
                                            className="bg-secondary rounded-md px-4 py-2 hover:bg-primary transition-colors duration-200"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleRemoveTransaction(transaction.id)}
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

            <AddTransaction isOpen={isOpen} onClose={() => handleOpen()} onConfirm={() => handleOpen()} transaction={selectedTransaction} />
        </div>
    )
}
