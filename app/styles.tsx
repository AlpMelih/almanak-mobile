import { StyleSheet } from 'react-native';

// Tema ayarları
export const lightTheme = {
    background: '#ffffff',
    text: '#000000',
    buttonBackground: '#ff6347',
    buttonText: '#fff',
    navbarselectedPage: 'rgba(169, 181, 220, 0.6)',
    newsbg: 'rgb(230, 210, 166)'
};

export const darkTheme = {
    background: '#121212',
    text: '#ffffff',
    buttonBackground: '#6200ea',
    buttonText: '#fff',
    navbarselectedPage: 'rgba(165, 188, 196, 0.8)',
    newsbg: 'rgb(73, 78, 80)'
};

// Stil oluşturma fonksiyonu
export const createStyles = (colortheme: any) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colortheme.background,
        },
        textCenter: {
            textAlign: 'center',
            fontSize: 18,
            color: colortheme.text,
        },
        button: {
            backgroundColor: colortheme.buttonBackground,
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
        },
        buttonText: {
            color: colortheme.buttonText,
            textAlign: 'center',
        },
    });
};
