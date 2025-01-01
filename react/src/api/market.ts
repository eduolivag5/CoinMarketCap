import axios, { isAxiosError } from "axios";
import { FearAndGreedIndexSchema, GlobalMetricsSchema } from "../types";

const urlBackend = import.meta.env.VITE_URL_BACKEND;

export async function getFearAndGreedIndex() {
    try {
        const url = `${urlBackend}/fear-and-greed`;
        const { data } = await axios.get(url);

        // Validación de la respuesta de la API usando Zod
        const response = FearAndGreedIndexSchema.safeParse(data);

        if (response.success) {
            return response.data.data
        } else {
            console.log(response.error)
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error desconocido');
        }
    }
}


export async function getGlobalMetrics() {
    try {
        const url = `${urlBackend}/global-metrics`;
        const { data } = await axios.get(url);

        // Validación de la respuesta de la API usando Zod
        const response = GlobalMetricsSchema.safeParse(data);

        if (response.success) {
            return response.data.data
        } else {
            console.log(response.error)
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error desconocido');
        }
    }
}