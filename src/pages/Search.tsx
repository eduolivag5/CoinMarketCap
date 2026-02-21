import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { searchCoins } from '../api/coins';
import Loading from '../components/Loading';
import { SearchItemsType } from '../types';
import { useNavigate } from 'react-router-dom';
import { cutFirst8Digits } from '../utils';

export default function Search() {
    const [searchText, setSearchText] = React.useState('');
    const [results, setResults] = React.useState<SearchItemsType | undefined>([]);

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ['search', searchText],  
        mutationFn: async (query: string) => searchCoins(query),
        onSuccess: (data) => {
            setResults(data);
        },
        onError: (error) => {
            console.error('Error al buscar:', error);
        },
    });

    
    const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchText(query);
        
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        if (query.length >= 2) {
            const timeout = setTimeout(() => {
                mutation.mutate(query);
            }, 500);

            setDebounceTimeout(timeout);
        } else {
            setResults([]);
        }
    };

    return (
        <div className='flex flex-col md:flex-row gap-2'>        
            <div className='space-y-2 md:px-4 md:border-r md:border-secondary md:w-96 md:min-w-96'>
                <p className='font-bold text-2xl'>Buscar</p>
                <div className='inline-flex w-full items-center gap-4 p-3 bg-secondary rounded-lg'>
                    <input
                        type="text"
                        value={searchText}
                        onChange={handleSearchChange} 
                        placeholder="Escribe para buscar..."
                        className="w-full text-sm rounded-lg focus:outline-none bg-transparent"
                    />
                    <FaSearch className="w-4 h-4" />
                </div>
            </div>
            

            <div className='md:p-4 w-full'>
                {mutation.isPending && <Loading />}

                {/* Mostrar los resultados de la búsqueda */}
                {results && results.length > 0 && (
                    <div className='w-full'>
                        <table className='w-full'>
                            <thead>
                                <tr className='text-xs font-light border-b border-secondary'>
                                    <td className='py-2 px-4'>Moneda</td>
                                    <td className='py-2 px-4 hidden md:table-cell'>Símbolo</td>
                                    <td className='py-2 px-4 text-right md:text-left'>Precio</td>
                                    <td className='py-2 px-4 text-right md:text-left'>24h %</td>
                                    <td className='py-2 px-4 hidden md:table-cell'>Plataforma</td>
                                </tr>
                            </thead>
                            <tbody>
                            {results.map((result) => (
                                <tr key={result.id} onClick={() => navigate(`/details/${result.id}`)} className='text-sm transition-colors duration-200 cursor-pointer hover:bg-secondary'>
                                    <td className='py-2 px-4'>
                                        <div className='flex items-center gap-2 font-bold'>
                                            <img src={result.logo} alt={result.name} className='rounded-lg w-8 h-8' />
                                            <div className='flex flex-col'>
                                                <p className='text-sm'>{result.name}</p>
                                                <p className='text-xs font-semibold text-gray-400 md:hidden'>{result.symbol}</p>
                                            </div>
                                        </div>                                        
                                    </td>
                                    <td className='py-2 px-4 hidden md:table-cell font-semibold'>{result.symbol}</td>
                                    <td className='py-2 px-4 text-right md:text-left'>
                                        {result.quotes?.USD?.price ? cutFirst8Digits(result.quotes?.USD?.price) : 'N/A'}
                                    </td>
                                    <td className={`py-2 px-4 text-right md:text-left ${result.quotes?.USD?.percent_change_24h! > 0 ? 'text-positive' : 'text-negative'}`}>
                                        {result.quotes?.USD?.percent_change_24h && cutFirst8Digits(result.quotes?.USD?.percent_change_24h.toFixed(2))}%
                                    </td>
                                    <td className='py-2 px-4 hidden md:table-cell'>{result.platform?.name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        
                    </div>
                )}
            </div>
        </div>
    )
}
