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
    
        // Ejecutar inmediatamente cuando `coinIds` cambie
        fetchData();
    
        // Crear un intervalo que ejecute la función cada 20 segundos
        const intervalId = setInterval(fetchData, 20000);
    
        // Limpiar el intervalo cuando se desmonta o cambia `coinIds`
        return () => {
            clearInterval(intervalId);
        };
    }, [coinIds, fetchCriptoListInfo]);

    return (
        <div className='space-y-4'>
            <header className='justify-between items-center flex'>
                <h1 className='text-2xl font-bold'>Portfolio</h1>
                <Link to={'/transactions'} className='border border-secondary px-6 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-secondary transition-colors duration-200'>
                    <BiTransfer />
                    Ver transacciones
                </Link>
            </header>

            {/* Mostrar un spinner o indicador de carga */}
            <div className='space-y-4'>
                <Header portfolio={portfolioList} />
                <PortfolioTable portfolio={portfolioList} />
            </div>
        </div>
    );
}
