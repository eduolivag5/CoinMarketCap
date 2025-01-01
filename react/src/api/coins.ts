import axios, { isAxiosError } from "axios";
import { CryptoDetailsSchema, CryptoListingsListSchema, CryptoQuotesDetailsSchema, CryptoQuotesListSchema, SearchSchema } from "../types";

export async function getTop100() {
    try {
        const url = `https://coinmarketcap-api-l004.onrender.com/listings`; 
        const { data } = await axios.get(url);

        // Validación de la respuesta de la API usando Zod
        const response = CryptoListingsListSchema.safeParse(data);

        if (response.success) {
            const top100 = response.data.data;
            
            // Crear una lista con los ids de las criptomonedas
            const cryptoIds = top100.map((crypto: any) => crypto.id);
            
            // Obtener los logos de las criptomonedas
            const logos = await getCryptoLogos(cryptoIds);
            
            // Añadir los logos al top100 de criptomonedas
            const top100WithLogos = top100.map((crypto: any) => ({
                ...crypto,
                logo: logos[crypto.id]
            }));

            return top100WithLogos;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error desconocido');
        }
    }
}

// Función para obtener los logos de las criptomonedas por ID
export async function getCryptoLogos(cryptoIds: number[]) {
    try {
        // Realizar una solicitud para obtener los detalles de las criptomonedas
        const url = `https://coinmarketcap-api-l004.onrender.com/crypto/info/id`;
        const params = {
            id: cryptoIds.join(',')
        };

        const { data } = await axios.get(url, { params });
        const logos: { [key: string]: string } = {};

        for (let id in data.data) {
            logos[id] = data.data[id].logo;
        }

        return logos;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error desconocido al obtener los logos');
        }
    }
}


export async function getCryptoDetails(id: string) {
    try {
        const detailsUrl = `https://coinmarketcap-api-l004.onrender.com/crypto/info/id`;
        const quotesUrl = `https://coinmarketcap-api-l004.onrender.com/crypto/quotes/id`;

        const params = { id };

        // Realizamos ambas solicitudes en paralelo
        const [detailsResponse, quotesResponse] = await Promise.all([
            axios.get(detailsUrl, { params }),
            axios.get(quotesUrl, { params })
        ]);

        // Validamos ambas respuestas
        const detailsParsed = CryptoDetailsSchema.safeParse(detailsResponse.data);
        const quotesParsed = CryptoQuotesDetailsSchema.safeParse(quotesResponse.data);

        if (detailsParsed.success && quotesParsed.success) {
            // Extraemos los datos necesarios
            const details = detailsParsed.data.data[id];
            const prices = quotesParsed.data.data[id];

            // Combinamos los datos de detalles con los precios
            return {
                ...details,
                prices // Añadimos solo los datos de precios
            };
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("Error desconocido al obtener los detalles de la criptomoneda.");
        }
    }
}


export async function searchCoins(query: string) {
    try {
        const url = `https://coinmarketcap-api-l004.onrender.com/crypto/map`; 
        const params = { symbol: query };
        const { data } = await axios.get(url, { params });

        // Validación de la respuesta de la API usando Zod
        const response = SearchSchema.safeParse(data);

        if (response.success && response.data.data) {
            // Crear una lista con los ids de las criptomonedas
            const cryptoIds = response.data.data.map((crypto: any) => crypto.id);
            
            // Obtener los logos de las criptomonedas
            const logos = await getCryptoLogos(cryptoIds);
            
            // Obtener los precios de las criptomonedas
            const quotes = await getCriptoListInfo(cryptoIds);

            // Combinar los resultados con los logos y precios
            const searchResultsWithDetails = response.data.data.map((crypto: any) => {
                const priceInfo = quotes?.find((quote: any) => quote.id === crypto.id);
                return {
                    ...crypto,
                    logo: logos[crypto.id],
                    quotes: priceInfo ? priceInfo.quote : null, // Incluir la información de precios (USD)
                };
            });

            return searchResultsWithDetails;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error desconocido');
        }
    }
}




export async function getCriptoListInfo(id: number[]) {
    try {
        
        if (id.length === 0) {
            return [];
        }
        
        const listaIds = id.join(',');

        const url = `https://coinmarketcap-api-l004.onrender.com/crypto/quotes/id`;
        const params = { id: listaIds };
        const { data } = await axios.get(url, { params });

        // Validación de la respuesta de la API usando Zod
        const response = CryptoQuotesListSchema.safeParse(data);

        if (response.success) {
            const list = Object.values(response.data.data); // Convertir el objeto en un array
            
            // Obtener los logos de las criptomonedas
            const logos = await getCryptoLogos(id);
            
            // Añadir los logos al top100 de criptomonedas
            const listWithLogos = list.map((crypto: any) => ({
                ...crypto,
                logo: logos[crypto.id]
            }));

            return listWithLogos;
        } else {
            console.log(response.error);
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error desconocido');
        }
    }
}
