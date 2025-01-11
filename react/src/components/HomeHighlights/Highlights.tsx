import { Tooltip } from '@mui/material'
import { FaRegQuestionCircle } from 'react-icons/fa'
import FearAndGreedIndex from './FearAndGreedIndex'
import GlobalMetrics from './GlobalMetrics'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getFearAndGreedIndex, getGlobalMetrics } from '../../api/market'
import { useState } from 'react'

export default function Highlights() {

    const { data: dataFearAndGreed, isError: isErrorFearAndGreed } = useQuery({
        queryKey: ['fear-and-greed'],
        queryFn: () => getFearAndGreedIndex()
    })

    const { data: dataGlobalMetrics, isError: isErrorGlobalMetrics } = useQuery({
        queryKey: ['global-metrics'],
        queryFn: () => getGlobalMetrics()
    })

    // Estado para controlar la visibilidad de Highlights
    const [showHighlights, setShowHighlights] = useState(true);

    // Función para manejar el cambio del interruptor
    const toggleHighlights = () => {
        setShowHighlights(prevState => !prevState);
    };

    return (
        <div>
            {isErrorFearAndGreed || isErrorGlobalMetrics && <div>Error al cargar los datos.</div>}
            {dataFearAndGreed && dataGlobalMetrics && (
            <div className='space-y-2'>
                <div className="flex items-center justify-between">
                    <h1 className="font-bold">Highlights</h1>
                    <div className="flex items-center gap-2">
                        <label htmlFor="highlights-toggle" className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="highlights-toggle"
                                    className="sr-only"
                                    checked={showHighlights}
                                    onChange={toggleHighlights}
                                />
                                <div className={`w-11 h-6 rounded-full ${showHighlights ? 'bg-primary' : 'bg-secondary'}`}></div>
                                <span
                                className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition transform duration-200 ease-in-out ${
                                    showHighlights ? 'translate-x-5' : ''
                                }`}></span>
                            </label>
                        <span className="text-sm font-semibold">Mostrar</span>
                    </div>
                </div>
                
                {showHighlights && (
                    <div id="homeHighlights" className="flex flex-col md:flex-row gap-4 font-semibold">
                        <div className="flex-1 p-4 rounded-lg border-2 border-secondary flex flex-col">
                            <div className="mb-4 flex justify-between items-center">
                                <span>Fear And Greed Index</span>
                                <Tooltip 
                                    title="El Fear And Greed Index mide el nivel de miedo o avaricia en el mercado cripto. Se calcula con datos como el volumen de trading y la capitalización total del mercado, mostrando un valor que refleja la incertidumbre y el riesgo." 
                                    arrow
                                >
                                    <button>
                                        <FaRegQuestionCircle className="w-4 h-4 text-primary" />
                                    </button>
                                </Tooltip>

                            </div>
                            <div className="flex-1 flex items-center justify-center">
                                <FearAndGreedIndex value={dataFearAndGreed.value} classification={dataFearAndGreed.value_classification} />
                            </div>
                        </div>

                        <div className="flex-1 p-4 rounded-lg border-2 border-secondary">
                            <div className="mb-4 flex justify-between items-center">
                                <span>Métricas globales</span>
                                <Link to="/global-metrics" className="text-sm text-primary">
                                    Ver más
                                </Link>
                            </div>
                            <GlobalMetrics prices={dataGlobalMetrics.quote.USD} />
                        </div>
                    </div>
                )}
            </div>
            )}
        </div>
    )
}
