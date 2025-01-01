import { TechnicalAnalysis } from "react-ts-tradingview-widgets";

export default function TechnicalAnalysisGraph({ symbol } : { symbol: string }) {
    return (
        <TechnicalAnalysis 
            symbol={symbol} 
            colorTheme="dark" 
            width="100%"
            isTransparent={true}
            interval="1D"
        />
    )
}
