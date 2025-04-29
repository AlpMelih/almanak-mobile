import React, { useState } from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { lightTheme, darkTheme } from '../../styles';
import { FontAwesome } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import '@/localeconfig';

const Index = () => {
    const scheme = useColorScheme();
    const theme = scheme === 'dark' ? darkTheme : lightTheme;

    const [showCalendar, setShowCalendar] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
        },
        calendarIcon: {
            fontSize: 100,
            color: theme.text,
            marginBottom: 20,
        },
        infoText: {
            fontSize: 18,
            color: theme.text,
            textAlign: 'center',
        },
        calendarContainer: {
            position: 'absolute',
            top: 100,
            left: 0,
            right: 0,
            backgroundColor: theme.background,
            padding: 10,
            borderRadius: 12,
            elevation: 5,
            zIndex: 100,
        },
    });

    return (
        <View style={styles.container}>
            {!showCalendar && (
                <>
                    <TouchableOpacity onPress={() => setShowCalendar(true)}>
                        <FontAwesome name="calendar" style={styles.calendarIcon} />
                    </TouchableOpacity>
                    <Text style={styles.infoText}>
                        Takvimi açmak için ikona tıkla. Herhangi bir bilgiye erişmek için önce bir tarih seçmelisin.
                    </Text>
                </>
            )}

            {showCalendar && (
                <View style={styles.calendarContainer}>
                    <Calendar
                        onDayPress={(day: any) => {
                            console.log('Seçilen gün:', day.dateString);
                            setShowCalendar(false);
                        }}
                        theme={{
                            backgroundColor: theme.background,
                            calendarBackground: theme.background,
                            dayTextColor: theme.text,
                            todayTextColor: 'orange',
                            selectedDayBackgroundColor: theme.text,
                            selectedDayTextColor: theme.background,
                            monthTextColor: theme.text,
                            arrowColor: theme.text,
                        }}
                    />
                </View>
            )}
        </View>
    );
};

export default Index;
