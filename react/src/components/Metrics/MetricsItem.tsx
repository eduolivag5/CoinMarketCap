import { formatNumber } from "../../utils";

interface MetricsItemProps {
    title: string;
    value: number | string;
    yesterday?: number;
}

export default function MetricsItem({ title, value, yesterday } : MetricsItemProps) {
    return (
        <div className="bg-secondary p-3 rounded-lg space-y-1">
            <p className="text-sm">{title}</p>
            <div className="flex items-center gap-6">
                <p className="text-lg font-bold">{formatNumber(value)}</p>
                {yesterday && 
                    <div className={`text-sm font-bold text-right ${yesterday > 0 ? 'text-positive' : 'text-negative'}`}>
                        {yesterday > 0 ? '▲ ' : '▼ '}
                        {yesterday.toFixed(2)}%                  
                    </div>
                }
            </div>
        </div>
    )
}
