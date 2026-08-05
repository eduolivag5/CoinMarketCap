import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { searchCoins } from '../api/coins';
import Loading from '../components/Loading';
import { SearchItemsType } from '../types';
import { useNavigate } from 'react-router-dom';
import { cutFirst8Digits, formatNumber } from '../utils';
import { HiOutlineSearch } from 'react-icons/hi';

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
        <div className='flex flex-col md:flex-row gap-6'>        
            {/* Panel Izquierdo / Barra de Búsqueda */}
            <div className='space-y-4 md:px-2 md:w-80 md:min-w-80'>
                <div>
                    <p className='font-bold text-2xl tracking-tight'>Buscar</p>
                    <p className='text-xs opacity-60 font-medium mt-0.5'>Encuentra criptomonedas y tokens.</p>
                </div>
                
                <div className='relative flex items-center bg-secondary/20 rounded-2xl px-4 py-3 border-none outline-none ring-0 focus-within:ring-1 focus-within:ring-primary/50 transition-colors'>
                    <FaSearch className="w-4 h-4 opacity-40 mr-3" />
                    <input
                        type="text"
                        value={searchText}
                        onChange={handleSearchChange} 
                        placeholder="Escribe para buscar..."
                        className="w-full text-sm focus:outline-none bg-transparent font-medium border-none ring-0 outline-none placeholder:text-secondary-foreground/40"
                    />
                </div>
            </div>

            {/* Panel Derecho / Resultados */}
            <div className='w-full'>
                {mutation.isPending && (
                    <div className='py-12 flex justify-center'>
                        <Loading />
                    </div>
                )}

                {!mutation.isPending && results && results.length > 0 && (
                    <div className='overflow-x-auto'>
                        <table className='w-full border-collapse border-none'>
                            <thead>
                                <tr className='text-xs uppercase tracking-wider opacity-50 border-none'>
                                    <th className='py-3 px-4 md:px-5 text-left font-bold border-none'>Moneda</th>
                                    <th className='py-3 px-4 md:px-5 text-left font-bold hidden md:table-cell border-none'>Símbolo</th>
                                    <th className='py-3 px-4 md:px-5 text-right md:text-left font-bold border-none'>Precio</th>
                                    <th className='py-3 px-4 md:px-5 text-right md:text-left font-bold border-none'>24h %</th>
                                    <th className='py-3 px-4 md:px-5 text-left font-bold hidden md:table-cell border-none'>Plataforma</th>
                                </tr>
                            </thead>
                            <tbody className='border-none'>
                                {results.map((result) => {
                                    const percent24h = result.quotes?.USD?.percent_change_24h;
                                    const isPositive = percent24h !== undefined && percent24h > 0;

                                    return (
                                        <tr 
                                            key={result.id} 
                                            onClick={() => navigate(`/details/${result.id}`)} 
                                            className='text-sm group hover:bg-secondary/15 transition-colors duration-200 cursor-pointer border-none'
                                        >
                                            <td className='py-4 px-4 md:px-5 border-none'>
                                                <div className='flex items-center gap-3'>
                                                    <img src={result.logo} alt={result.name} className='rounded-full w-8 h-8 bg-secondary/20 p-0.5 shadow-sm' />
                                                    <div className='flex flex-col'>
                                                        <p className='font-bold tracking-tight'>{result.name}</p>
                                                        <p className='text-[10px] uppercase opacity-55 font-semibold md:hidden'>{result.symbol}</p>
                                                    </div>
                                                </div>         
                                            </td>
                                            
                                            <td className='py-4 px-4 md:px-5 hidden md:table-cell font-semibold uppercase text-xs opacity-70 border-none'>
                                                {result.symbol}
                                            </td>
                                            
                                            <td className='py-4 px-4 md:px-5 text-right md:text-left font-bold border-none'>
                                                {result.quotes?.USD?.price ? `$${cutFirst8Digits(result.quotes?.USD?.price)}` : 'N/A'}
                                            </td>
                                            
                                            <td className={`py-4 px-4 md:px-5 text-right md:text-left font-bold text-xs border-none ${isPositive ? 'text-positive' : 'text-negative'}`}>
                                                {percent24h !== undefined ? `${formatNumber(percent24h.toFixed(2))}%` : '0.00%'}
                                            </td>
                                            
                                            <td className='py-4 px-4 md:px-5 hidden md:table-cell text-xs opacity-70 font-medium border-none'>
                                                {result.platform?.name || 'N/A'}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {results && results.length === 0 && !mutation.isPending && searchText.length >= 2 && (
                    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-secondary/10 space-y-3 my-6 border-none">
                        <div className="w-14 h-14 rounded-2xl bg-secondary/30 flex items-center justify-center text-primary shadow-sm">
                            <HiOutlineSearch className="w-7 h-7 opacity-70" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-base">No se encontraron resultados</p>
                            <p className="text-xs opacity-60 font-medium">Prueba a buscar con otro término o símbolo.</p>
                        </div>
                    </div>
                )}

                {searchText.length < 2 && !mutation.isPending && (
                    <div className="flex flex-col items-center justify-center p-16 text-center rounded-3xl bg-secondary/10 space-y-3 my-6 border-none">
                        <div className="w-14 h-14 rounded-2xl bg-secondary/30 flex items-center justify-center text-primary shadow-sm">
                            <HiOutlineSearch className="w-7 h-7 opacity-70" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-base">Empieza a escribir</p>
                            <p className="text-xs opacity-60 font-medium">Introduce al menos 2 caracteres para buscar activos.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}