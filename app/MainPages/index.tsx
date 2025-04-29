import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, useColorScheme } from 'react-native';
import { usePathname } from 'expo-router';
import Bottombar from '@/lib/components/tabbar/Bottombar';

import Calendar from './Calendar';  // Calendar ekranını import et
import Main from './Main';  // Main ekranını import et
import { lightTheme, darkTheme } from '@/app/styles';
export default function MainLayout() {

    const scheme = useColorScheme();
    const theme = scheme === 'dark' ? darkTheme : lightTheme;
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background, // Arka plan rengini ayarladık
        },
        stackContainer: {
            flex: 1,
            paddingBottom: 1, // BottomBar'ın yüksekliği kadar boşluk bırak
        },
    });
    const [pathname, setPathname] = useState<any>('home')
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.stackContainer}>
                {/* Sayfalar burada render edilecek */}
                {pathname == 'home' && <Main ></Main>}
                {pathname === 'calendar' && <Calendar />}  {/* Calendar ekranını render et */}
            </View>

            {/* BottomBar her zaman ekranın alt kısmında görünecek */}
            <Bottombar setPathname={setPathname} pathname={pathname} />
        </SafeAreaView>
    );
}

