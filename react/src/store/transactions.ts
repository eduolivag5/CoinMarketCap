import { create } from 'zustand';
import { SearchItemType } from '../types';

export interface Transaction {
    id: string;
    amount: number;
    price: number;
    date: string;
    coin: SearchItemType;
}

interface TransactionStore {
    transactions: Transaction[];
    addTransaction: (transaction: Transaction) => void;
    editTransaction: (id: string, updatedTransaction: Partial<Transaction>) => void;
    removeTransaction: (id: string) => void;
    removeAllCoinTransactions: (coinId: number) => void; // Nueva función
}

// Cargar las transacciones desde localStorage al inicializar el store
const loadTransactionsFromStorage = (): Transaction[] => {
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
};

export const useTransactionStore = create<TransactionStore>((set) => ({
    transactions: loadTransactionsFromStorage(),  // Cargar del localStorage

    addTransaction: (transaction) => set((state) => {
        const updatedTransactions = [...state.transactions, transaction];
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));  // Guardar en localStorage
        return { transactions: updatedTransactions };
    }),

    editTransaction: (id, updatedTransaction) => set((state) => {
        const updatedTransactions = state.transactions.map((transaction) =>
            transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction
        );
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));  // Guardar en localStorage
        return { transactions: updatedTransactions };
    }),

    removeTransaction: (id) => set((state) => {
        const updatedTransactions = state.transactions.filter((transaction) => transaction.id !== id);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));  // Guardar en localStorage
        return { transactions: updatedTransactions };
    }),

    removeAllCoinTransactions: (coinId) => set((state) => {
        const updatedTransactions = state.transactions.filter((transaction) => transaction.coin.id !== coinId);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));  // Guardar en localStorage
        return { transactions: updatedTransactions };
    }),
}));
