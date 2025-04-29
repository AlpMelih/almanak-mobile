import apiClient from "@/hooks/axiosInstance";

export const getAllNews = (page: number) => {
    return apiClient.get(`/news/news/${page}`);
};

export const getFinanceNews = (page: number) => {
    return apiClient.get(`/news/finance-news/${page}`);
};
export const getSPORTSNews = (page: number) => {
    return apiClient.get(`/news/Sport-news/${page}`);
};
export const getNewsByDate = (page: number, date: string) => {
    return apiClient.get(`/news/by-date/${date}/${page}`);
};

export const getNewsWithRoot = (text: string) => {
    return apiClient.get('/news/similar', {
        params: { text } // Sending 'text' as a query parameter
    });
};
