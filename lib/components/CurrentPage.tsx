// hooks/useUpdateCurrentPage.ts
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUpdateCurrentPage = (pathname: string) => {
    useEffect(() => {
        const saveCurrentPage = async () => {
            try {
                await AsyncStorage.setItem('girildi', pathname);
                console.log('Kaydedilen Sayfa:', pathname);
            } catch (error) {
                console.error('Sayfa kaydedilemedi:', error);
            }
        };

        saveCurrentPage();
    }, []);
};
