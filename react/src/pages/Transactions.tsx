import { useState, useEffect } from 'react';
import { Transaction, useTransactionStore } from '../store/transactions';
import { IoIosAddCircle } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import TransactionsTable from '../components/Portfolio/TransactionsTable';
import AddTransaction from '../components/Portfolio/AddTransaction';

export default function Transactions() {
    
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    
    const { id } = useParams<{ id: string }>();  
    
    const { transactions } = useTransactionStore();

    useEffect(() => {
        if (id) {
            setFilteredTransactions(transactions.filter(transaction => transaction.coin.id === Number(id)));
        } else {
            setFilteredTransactions(transactions);
        }
    }, [id, transactions]);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <header className='justify-between items-center flex mb-4'>
                <h1 className='text-2xl font-bold'>Transacciones</h1>
                <button onClick={() => handleOpen()} className='border border-secondary hover:bg-secondary transition-colors duration-200 px-6 py-2 rounded-lg text-sm flex items-center gap-2'>
                    <IoIosAddCircle className="text-base" />
                    <span className='hidden md:block'>Añadir transacción</span>
                </button>
            </header>

            <TransactionsTable transactions={filteredTransactions} />

            <AddTransaction isOpen={isOpen} onClose={() => handleOpen()} onConfirm={() => handleOpen()} transaction={null} />
        </div>
    );
}
