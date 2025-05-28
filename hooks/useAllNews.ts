import { useQuery } from '@tanstack/react-query';
import { getAllNews, getFavoriteNews, getFinanceNews, getNewsByDate, getNewsWithRoot, getSPORTSNews } from '@/services/allNewsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useNews = (page: number) => {
    return useQuery({
        queryKey: ['news', page],
        queryFn: () => getAllNews(page).then(res => res.data),
    });
};

export const useFinanceNews = (page: number) => {
    return useQuery({
        queryKey: ['financeNews', page],
        queryFn: () => getFinanceNews(page).then(res => res.data),
    });
};

export const useSportsNews = (page: number) => {
    return useQuery({
        queryKey: ['SPORTS', page],
        queryFn: () => getSPORTSNews(page).then(res => res.data),
    });
};

export const useNewsByDate = (page: number, date: string) => {
    return useQuery({
        queryKey: ['newsByDate', date, page],
        queryFn: () => getNewsByDate(page, date).then(res => res.data),
    });
};

export const useNewsWithHook = (input: string) => {
    return useQuery({
        queryKey: ['newsWithRoot', input],
        queryFn: () => getNewsWithRoot(input).then(res => res.data),
    });
};

export const useTechNews = (page: number) => {
    return useQuery({
        queryKey: ['TechNews', page],
        queryFn: () => getFinanceNews(page).then(res => res.data),
    });
};

export const useFavorites = (list: any) => {
    const [categories, setCategories] = useState<string[] | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const stored = await AsyncStorage.getItem('SELECTED_CATEGORIES0');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setCategories(parsed);
                }
            } catch (e) {
                console.error('Kategori okuma hatası:', e);
            }
        };

        fetchCategories();
    }, []);

    return useQuery({
        queryKey: ['Favoritess', list, categories],
        queryFn: () => getFavoriteNews(categories!).then(res => res.data),
        enabled: !!categories,
    });
};
