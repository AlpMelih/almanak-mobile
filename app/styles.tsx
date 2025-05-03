import { StyleSheet } from 'react-native';

// Tema ayarları
// Gazete tarzı sade tema
export const lightTheme = {
    background: '#ffffff',          // Beyaz zemin
    text: '#000000',                // Siyah yazı
    buttonBackground: '#000000',    // Siyah buton
    buttonText: '#ffffff',          // Beyaz buton yazısı
    navbarselectedPage: '#e0e0e0',  // Açık gri (seçili sayfa)
    newsbg: '#f8f8f8'               // Soluk gri (haber kutusu arka planı)
};

export const darkTheme = {
    background: '#000000',          // Siyah zemin
    text: '#ffffff',                // Beyaz yazı
    buttonBackground: '#ffffff',    // Beyaz buton
    buttonText: '#000000',          // Siyah buton yazısı
    navbarselectedPage: '#333333',  // Koyu gri
    newsbg: '#1a1a1a'               // Haber kutusu koyu gri tonu
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
