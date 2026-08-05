import { formatBigNumber } from "../../utils"; // Ajusta la ruta a tu archivo de utilidades

interface MetricsItemProps {
    title: string;
    value: number | string;
    yesterday?: number;
    compact?: boolean;
    decimals?: number;
    isCurrency?: boolean;
    suffix?: string; // Nuevo para añadir '%' u otros símbolos
}

export default function MetricsItem({ 
    title, 
    value, 
    yesterday, 
    compact = false, 
    decimals = 2,
    isCurrency = false,
    suffix = ''
}: MetricsItemProps) {
    
    // Si es un número normal y pequeño (como los porcentajes de dominancia), podemos usar un formato estándar o el bigNumber
    const formattedValue = typeof value === 'number' && value < 1000 
        ? new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value)
        : formatBigNumber(value, decimals);

    let displayValue = formattedValue;
    if (isCurrency) displayValue = `$${displayValue}`;
    if (suffix) displayValue = `${displayValue}${suffix}`;

    if (compact) {
        return (
            <div className="flex items-center justify-between py-2 border-b border-secondary/40 last:border-none">
                <span className="text-sm opacity-70">{title}</span>
                <div className="flex items-center gap-3">
                    <span className="font-bold text-sm">{displayValue}</span>
                    {yesterday !== undefined && (
                        <span className={`text-xs font-bold ${yesterday > 0 ? 'text-positive' : 'text-negative'}`}>
                            {yesterday > 0 ? '+' : ''}{yesterday.toFixed(2)}%
                        </span>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-secondary/30 p-4 rounded-xl border border-secondary flex flex-col justify-between">
            <span className="text-xs font-medium opacity-60 uppercase tracking-wider mb-1">{title}</span>
            <div className="flex items-baseline justify-between">
                <span className="text-xl font-black tracking-tight">
                    {displayValue}
                </span>
                {yesterday !== undefined && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${yesterday > 0 ? 'text-positive bg-positive/10' : 'text-negative bg-negative/15'}`}>
                        {yesterday > 0 ? '▲ ' : '▼ '}
                        {Math.abs(yesterday).toFixed(2)}%
                    </span>
                )}
            </div>
        </div>
    );
}