import axios, { isAxiosError } from "axios";
import { CategoriesSchema, CategoryDetailsSchema } from "../types";
import { getCryptoLogos } from "./coins";

const urlBackend = import.meta.env.VITE_URL_BACKEND;

export async function getCategories() {
    try {
        const url = `${urlBackend}/categories`;
        const { data } = await axios.get(url);

        // Validación de la respuesta de la API usando Zod
        const response = CategoriesSchema.safeParse(data);

        if (response.success) {
            return response.data.data
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


export async function getCategoryDetails(id: string) {
    try {
        const url = `${urlBackend}/categories/details`;
        const params = { id };
        const { data } = await axios.get(url, { params });

        // Validación de la respuesta de la API usando Zod
        const response = CategoryDetailsSchema.safeParse(data);

        if (response.success) {
            const coinsResults = response.data.data.coins;

            // Crear una lista con los ids de las criptomonedas
            const cryptoIds = coinsResults.map((crypto: any) => crypto.id);

            // Obtener los logos de las criptomonedas
            const logos = await getCryptoLogos(cryptoIds);

            // Reemplazar las monedas originales con las que tienen los logos
            response.data.data.coins = coinsResults.map((crypto: any) => ({
                ...crypto,
                logo: logos[crypto.id]
            }));

            // Devolver los datos completos con las monedas actualizadas
            return response.data;
        } else {
            console.log(response.error);
            throw new Error('Validación fallida en la estructura de la API.');
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error desconocido');
        }
    }
}

