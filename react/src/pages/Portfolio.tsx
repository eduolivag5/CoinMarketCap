import { BiTransfer } from 'react-icons/bi';
import { useMemo, useState, useEffect } from "react";
import { useTransactionStore } from "../store/transactions";
import { Link } from 'react-router-dom';
import { convertTransactionsToPortfolio } from '../utils';
import PortfolioTable from '../components/Portfolio/PortfolioTable';
import { useMutation } from '@tanstack/react-query';
import { getCriptoListInfo } from '../api/coins';
import { PortfolioItem } from '../types';
import Loading from '../components/Loading';
import Header from '../components/Portfolio/Header';

export default function Portfolio() {
    const { transactions } = useTransactionStore();
    const [portfolioList, setPortfolioList] = useState<PortfolioItem[]>([]);
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga

    // Memorizar items y coinIds
    const portfolioItems = useMemo(() => convertTransactionsToPortfolio(transactions), [transactions]);
    const coinIds = useMemo(
        () => portfolioItems.map((item) => Number(item.coin.id)).filter((id) => !isNaN(id)),
        [portfolioItems]
    );

    // Configurar useMutation con onSuccess y manejo manual del estado
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
            console.log(portfolioList)
            setIsLoading(false); // Finalizar carga cuando los datos se actualizan
        },
        onError: () => {
            setIsLoading(false); // Finalizar carga incluso si hay error
        },
    });

    // Llamar a la API cuando cambien los coinIds
    useEffect(() => {
        if (coinIds.length > 0) {
            setIsLoading(true); // Activar estado de carga
            fetchCriptoListInfo(coinIds);
        }
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
            {isLoading ? (
                <Loading />
            ) : (
                <div className='space-y-4'>
                    <Header portfolio={portfolioList} />
                    <PortfolioTable portfolio={portfolioList} />
                </div>
            )}
        </div>
    );
}
