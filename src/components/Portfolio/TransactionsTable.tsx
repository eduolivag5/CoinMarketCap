import { useState } from 'react';
import AddTransaction from './AddTransaction';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { HiOutlineReceiptRefund } from 'react-icons/hi2';
import { Transaction, useTransactionStore } from '../../store/transactions';
import { cutFirst8Digits } from '../../utils';

export default function TransactionsTable({ transactions }: { transactions: Transaction[] }) {
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
        <div className="w-full">    
            {transactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-secondary/10 space-y-3 my-6">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/30 flex items-center justify-center text-primary shadow-sm">
                        <HiOutlineReceiptRefund className="w-7 h-7 opacity-70" />
                    </div>
                    <div className="space-y-1">
                        <p className="font-bold text-base">No hay transacciones registradas</p>
                        <p className="text-xs opacity-60 font-medium">Añade tu primera compra o venta para verla listada aquí.</p>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className='text-xs uppercase tracking-wider opacity-50 border-b border-secondary/40'>
                                <th className="px-5 py-3 text-left font-bold">Moneda</th>
                                <th className="px-5 py-3 text-right md:text-left font-bold">Cantidad</th>
                                <th className="px-5 py-3 text-left font-bold hidden md:table-cell">Precio</th>
                                <th className="px-5 py-3 text-left font-bold hidden md:table-cell">Gastado</th>
                                <th className="px-5 py-3 text-left font-bold hidden md:table-cell">Fecha</th>
                                <th className="px-5 py-3 text-right font-bold hidden md:table-cell">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary/20">
                            {transactions.map((transaction) => (
                                <tr 
                                    key={transaction.id} 
                                    className='text-sm group hover:bg-secondary/15 transition-colors duration-200'
                                >
                                    <td className="px-5 py-4 flex items-center gap-3">
                                        <img 
                                            src={transaction.coin.logo} 
                                            alt={transaction.coin.name} 
                                            className="w-8 h-8 rounded-full bg-secondary/20 p-0.5 shadow-sm" 
                                        />
                                        <div className="flex flex-col">
                                            <span className='font-bold tracking-tight'>{transaction.coin.name}</span>
                                            <span className='text-xs uppercase opacity-55 font-semibold'>{transaction.coin.symbol}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-right md:text-left">
                                        <p className='font-bold'>{transaction.amount} <span className="text-xs opacity-60">{transaction.coin.symbol}</span></p>
                                        <p className='text-xs opacity-60 font-medium md:hidden'>${(transaction.price * transaction.amount).toFixed(2)}</p>
                                    </td>
                                    <td className="px-5 py-4 hidden md:table-cell font-medium opacity-80">${cutFirst8Digits(transaction.price)}</td>
                                    <td className="px-5 py-4 hidden md:table-cell font-bold">${(transaction.price * transaction.amount).toFixed(2)}</td>  
                                    <td className="px-5 py-4 hidden md:table-cell text-xs opacity-75 font-medium">{transaction.date}</td>
                                    <td className="px-5 py-4 text-right hidden md:table-cell">
                                        <div className='flex items-center gap-1.5 justify-end'>
                                            <button
                                                onClick={() => handleOpen(transaction)}
                                                className="w-9 h-9 rounded-xl bg-secondary/30 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                                                title="Editar transacción"
                                            >
                                                <FaEdit className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleRemoveTransaction(transaction.id)}
                                                className="w-9 h-9 rounded-xl bg-secondary/30 hover:bg-negative hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                                                title="Eliminar transacción"
                                            >
                                                <FaTrash className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <AddTransaction 
                isOpen={isOpen} 
                onClose={() => handleOpen()} 
                onConfirm={() => handleOpen()} 
                transaction={selectedTransaction} 
            />
        </div>
    )
}