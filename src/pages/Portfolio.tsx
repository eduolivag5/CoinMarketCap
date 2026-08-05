import { BiTransfer } from 'react-icons/bi';
import { useMemo, useState, useEffect } from "react";
import { useTransactionStore } from "../store/transactions";
import { Link } from 'react-router-dom';
import { convertTransactionsToPortfolio } from '../utils';
import PortfolioTable from '../components/Portfolio/PortfolioTable';
import { useMutation } from '@tanstack/react-query';
import { getCriptoListInfo } from '../api/coins';
import { PortfolioItem } from '../types';
import Header from '../components/Portfolio/Header';
import { HiOutlineWallet } from 'react-icons/hi2';

export default function Portfolio() {
    const { transactions } = useTransactionStore();
    const [portfolioList, setPortfolioList] = useState<PortfolioItem[]>([]);
    
    const portfolioItems = useMemo(() => convertTransactionsToPortfolio(transactions), [transactions]);
    const coinIds = useMemo(
        () => portfolioItems.map((item) => Number(item.coin.id)).filter((id) => !isNaN(id)),
        [portfolioItems]
    );

    const { mutate: fetchCriptoListInfo } = useMutation({
        mutationFn: getCriptoListInfo,
        onSuccess: (data) => {
            const updatedItems = portfolioItems.map((item) => {
                const matchingCripto = data?.find((cripto) => cripto.id === Number(item.coin.id));
                if (matchingCripto) {
                    return {
                        ...item,
                        totalValue: matchingCripto.quote.USD.price! * item.amount,
                        coin: {
                            ...item.coin,
                            quotes: matchingCripto.quote,
                        },
                    };
                }
                return item;
            });
            setPortfolioList(updatedItems);
        }
    });

    useEffect(() => {
        const fetchData = () => {
            if (coinIds.length > 0) {
                fetchCriptoListInfo(coinIds);
            }
        };
    
        fetchData();
        const intervalId = setInterval(fetchData, 20000);
    
        return () => {
            clearInterval(intervalId);
        };
    }, [coinIds, fetchCriptoListInfo]);

    return (
        <div className='space-y-6 max-w-6xl mx-auto pb-16'>
            {/* Cabecera limpia y moderna */}
            <header className='flex justify-between items-center pb-4'>
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-50">Gestión de activos</span>
                    <h1 className='text-3xl font-black tracking-tight mt-1'>Portfolio</h1>
                </div>
                <Link 
                    to={'/transactions'} 
                    className='bg-secondary/15 hover:bg-secondary/25 px-5 py-2.5 rounded-2xl text-sm font-semibold flex items-center gap-2 transition-all duration-200 shadow-sm'
                >
                    <BiTransfer className="text-primary text-base" />
                    Ver transacciones
                </Link>
            </header>

            {/* Contenido principal o estado vacío si no hay transacciones */}
            {transactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-secondary/10 space-y-4 my-12">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/30 flex items-center justify-center text-primary shadow-sm">
                        <HiOutlineWallet className="w-8 h-8 opacity-70" />
                    </div>
                    <div className="space-y-1 max-w-sm">
                        <h4 className="font-bold text-lg">Tu portfolio está vacío</h4>
                        <p className="text-sm opacity-60 font-medium">
                            Empieza a registrar tus transacciones de compra o venta para hacer un seguimiento detallado de tus ganancias y activos.
                        </p>
                    </div>
                </div>
            ) : (
                <div className='space-y-6'>
                    <Header portfolio={portfolioList} />
                    <PortfolioTable portfolio={portfolioList} />
                </div>
            )}
        </div>
    );
}