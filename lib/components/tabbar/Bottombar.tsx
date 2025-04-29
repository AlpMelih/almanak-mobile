import React, { useState } from 'react';

import { lightTheme, darkTheme } from '@/app/styles';

import { View, Text, FlatList, Image, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';

interface BottombarProps {
    setPathname: (pathname: string) => void; // setPathname fonksiyonu
    pathname: string; // pathname prop'u
}


export const Bottombar = ({ setPathname, pathname }: BottombarProps
) => {
    const scheme = useColorScheme();
    const theme = scheme === 'dark' ? darkTheme : lightTheme;

    const router = useRouter()


    const styles = StyleSheet.create({
        container: {
            width: 'auto',
            backgroundColor: theme.text,
            height: 60,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10,
            borderRadius: 16,

        },
        iconStyle: {
            color: theme.background,
            fontSize: 26

        },
        selectedIcon: {
            color: theme.background,

            backgroundColor: theme.navbarselectedPage,
            borderRadius: 16,
            top: -20,
            width: 50,
            height: 50, // yükseklik ekledik ki tam kare olsun
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex', // flex davranışı için gerekli
        },
        fixedBottomBar: {
            position: 'fixed',
            bottom: 10,
            left: 0,
            right: 0,
            alignItems: 'center',
            zIndex: 999, // Diğer elementlerin üstünde kalır
            width: 'auto'
        },



    });

    const changeHomePage = () => {

        setPathname('home')
    }
    const changeCalendarPage = () => {

        setPathname('calendar')
    }

    return (

        <View style={styles.container} >
            <TouchableOpacity onPress={changeHomePage} style={pathname === 'home' ? styles.selectedIcon : null}  ><FontAwesome name="home" style={styles.iconStyle} /></TouchableOpacity>
            <TouchableOpacity onPress={changeCalendarPage} style={pathname === 'calendar' ? styles.selectedIcon : null} ><FontAwesome name="calendar" style={styles.iconStyle} /></TouchableOpacity>
        </View>
    );
};

export default Bottombar;
