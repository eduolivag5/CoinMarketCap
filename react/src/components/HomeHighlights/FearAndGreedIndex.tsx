import { getCoordinates } from '../../utils';

interface FearAndGreedIndexProps {
    value: number;
    classification: string;
}

export default function FearAndGreedIndex({ value, classification } : FearAndGreedIndexProps) {

    const { cx, cy } = value ? getCoordinates(value) : { cx: 100, cy: 95 };    

    return (
        <div className="flex flex-col items-center">
            <div className="svg-container relative">
                <svg width="200" height="105" viewBox="0 0 200 105">
                    <path d="M 13 95 A 87 87 0 0 1 25.58 49.93" stroke="#EA3943" strokeWidth="6" strokeLinecap="round" fill="none" />
                    <path d="M 30.7 42.4 A 87 87 0 0 1 67.97 14.11" stroke="#EA8C00" strokeWidth="6" strokeLinecap="round" fill="none" />
                    <path d="M 76.6 11.2 A 87 87 0 0 1 123.4 11.2" stroke="#F3D42F" strokeWidth="6" strokeLinecap="round" fill="none" />
                    <path d="M 132.03 14.11 A 87 87 0 0 1 169.3 42.4" stroke="#93D900" strokeWidth="6" strokeLinecap="round" fill="none" />
                    <path d="M 174.42 49.93 A 87 87 0 0 1 187 95" stroke="#16C784" strokeWidth="6" strokeLinecap="round" fill="none" />

                    <circle cx={cx} cy={cy} r="7" fill="none" stroke="white" strokeWidth="2" />
                    <circle cx={cx} cy={cy} r="6" fill="black" />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-end">
                    <p className="text-3xl font-semibold">{value}</p>
                    <p className="text-xs text-gray-400">{classification}</p>
                </div>
            </div>
        </div>
    );
}
