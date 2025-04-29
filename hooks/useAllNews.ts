import { useQuery } from '@tanstack/react-query';
import { getAllNews, getFinanceNews, getNewsByDate, getNewsWithRoot, getSPORTSNews } from '@/services/allNewsService';

export const useNews = (page: number) => {
    return useQuery({
        queryKey: ['news', page], // Her sayfa farklı cache'lensin diye
        queryFn: () => getAllNews(page).then(res => res.data),
    });
};

export const useFinanceNews = (page: number) => {
    return useQuery({
        queryKey: ['financeNews', page], // Farklı cache key
        queryFn: () => getFinanceNews(page).then(res => res.data),
    });
};
export const useSportsNews = (page: number) => {
    return useQuery({
        queryKey: ['SPORTS', page], // Farklı cache key
        queryFn: () => getSPORTSNews(page).then(res => res.data),
    });


};
export const useNewsByDate = (page: number, date: string) => {
    return useQuery({
        queryKey: ['newsByDate', date, page], // Tarih ve sayfa bilgisine göre cache
        queryFn: () => getNewsByDate(page, date).then(res => res.data),
    });
};
export const useNewsWithHook = (input: string) => {
    return useQuery({
        queryKey: ['newsByDate', input], // 
        queryFn: () => getNewsWithRoot(input).then(res => res.data),
    });
};



