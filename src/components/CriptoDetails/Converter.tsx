import React, { useState } from 'react';

interface ConverterProps {
    symbol: string;
    price: number;
    logo: string;
}

export default function Converter({ symbol, price, logo }: ConverterProps) {
    const [usdValue, setUsdValue] = useState<string>('100');
    const [tokenValue, setTokenValue] = useState<string>('');

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
        <div className="flex flex-wrap items-center gap-4">

            {/* Token Input */}
            <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="tokens" className="text-sm font-medium flex items-center gap-2">
                    <img src={logo} alt={symbol} className="h-6 w-6" />
                    {symbol}
                </label>
                <input
                    id="tokens"
                    type="number"
                    value={tokenValue}
                    onChange={handleTokenChange}
                    placeholder={`Enter ${symbol}`}
                    className="border border-secondary p-2 rounded focus:outline-none bg-transparent w-full"
                />
            </div>

            {/* USD Input */}
            <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="usd" className="text-sm font-medium flex items-center gap-2">
                    <img src='/tether.svg' alt='Tether' className='h-6 w-6' />
                    USDT
                </label>
                <input
                    id="usd"
                    type="number"
                    value={usdValue}
                    onChange={handleUsdChange}
                    placeholder="Enter USD"
                    className="border border-secondary p-2 rounded focus:outline-none bg-transparent w-full"
                />
            </div>

            
        </div>
    );
}
