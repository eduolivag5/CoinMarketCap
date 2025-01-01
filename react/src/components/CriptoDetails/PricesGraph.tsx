import { useContext } from 'react';
import { SymbolOverview } from 'react-ts-tradingview-widgets';
import { ThemeContext } from '../../ThemeContext';

interface TradingViewChartProps {
  symbol: string;
}

export default function TradingViewChart ({ symbol } : TradingViewChartProps) {

    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error('ThemeContext debe ser usado dentro de un ThemeProvider');
    }

    const { theme } = themeContext;

    return (
        <SymbolOverview
            chartOnly={true}
            autosize
            isTransparent={true}
            colorTheme={theme}
            dateFormat='dd/MM/yyyy'
            width="100%"
            height="100%"
            chartType="area"
            downColor="#800080"
            borderDownColor="#800080"
            wickDownColor="#800080" 
            symbols={[[symbol, symbol]]}
        />
    );
}
