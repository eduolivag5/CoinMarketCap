import React, { useState } from 'react';

interface ConverterProps {
    symbol: string;
    price: number;
    logo: string;
}

export default function Converter({ symbol, price, logo }: ConverterProps) {
    const [usdValue, setUsdValue] = useState<string>('100');
    const [tokenValue, setTokenValue] = useState<string>((100 / price).toFixed(6));

    const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const usd = parseFloat(e.target.value);
        setUsdValue(e.target.value);
        if (!isNaN(usd)) {
            setTokenValue((usd / price).toFixed(6));
        } else {
            setTokenValue('');
        }
    };

    const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tokens = parseFloat(e.target.value);
        setTokenValue(e.target.value);
        if (!isNaN(tokens)) {
            setUsdValue((tokens * price).toFixed(2));
        } else {
            setUsdValue('');
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="tokens" className="text-xs font-semibold opacity-70 flex items-center gap-2">
                    <img src={logo} alt={symbol} className="h-5 w-5 rounded-full" />
                    {symbol}
                </label>
                <input
                    id="tokens"
                    type="number"
                    value={tokenValue}
                    onChange={handleTokenChange}
                    placeholder={`Enter ${symbol}`}
                    style={{ backgroundColor: 'var(--color-secondary)', opacity: 0.9, color: 'inherit' }}
                    className="p-3.5 rounded-2xl w-full text-sm font-bold border-none outline-none ring-0 focus:ring-1 focus:ring-primary/50 placeholder:opacity-40"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="usd" className="text-xs font-semibold opacity-70 flex items-center gap-2">
                    <img src='/tether.svg' alt='Tether' className='h-5 w-5 rounded-full' />
                    USDT
                </label>
                <input
                    id="usd"
                    type="number"
                    value={usdValue}
                    onChange={handleUsdChange}
                    placeholder="Enter USD"
                    style={{ backgroundColor: 'var(--color-secondary)', opacity: 0.9, color: 'inherit' }}
                    className="p-3.5 rounded-2xl w-full text-sm font-bold border-none outline-none ring-0 focus:ring-1 focus:ring-primary/50 placeholder:opacity-40"
                />
            </div>
        </div>
    );
}