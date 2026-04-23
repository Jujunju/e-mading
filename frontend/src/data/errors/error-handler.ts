import axios from "axios"

export const handleApiError = (error: unknown) => {
    if(axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.error || error.response?.data?.data;
        return serverMessage || 'Terjadi kesalahan server';
    }
    return error instanceof Error ? error.message : 'Terjadi kesalahan sistem'
}