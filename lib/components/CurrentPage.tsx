import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateCurrentPage = async (pathname: string) => {
    try {
        await AsyncStorage.setItem('girildi', pathname);
        console.log('Kaydedilen Sayfa:', pathname);
    } catch (error) {
        console.error('Sayfa kaydedilemedi:', error);
    }
};
