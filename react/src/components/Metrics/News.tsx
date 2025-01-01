import { Timeline } from "react-ts-tradingview-widgets";

export default function News() {
    return (
        <Timeline 
            colorTheme="dark" 
            feedMode="market" 
            market="crypto" 
            isTransparent={true}
            displayMode="adaptive"
            locale="es"
            autosize={true}
        />
    )
}
