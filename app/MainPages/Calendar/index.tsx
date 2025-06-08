import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, Image, StyleSheet, useColorScheme, ActivityIndicator,
    TouchableOpacity, Linking
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons';

import { lightTheme, darkTheme } from '../../styles';
import { useNewsByDate } from '@/hooks/useAllNews';
import DropDownPicker from 'react-native-dropdown-picker';

const DateNewsPage = () => {
    const scheme = useColorScheme();
    const theme = scheme === 'dark' ? darkTheme : lightTheme;

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [newsList, setNewsList] = useState<any[]>([]);

    const categories = [
        { label: 'All', value: 'All' },
        { label: 'SPORTS', value: 'sport' },
        { label: 'Finance', value: 'finance' },
    ];

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('All');
    const [items, setItems] = useState(categories);

    const filteredNews = value === 'All'
        ? newsList
        : newsList.filter(item => item.category?.toLowerCase() === value?.toLowerCase());

    const {
        data: newsData,
        isLoading,
        error,
    } = useNewsByDate(page, selectedDate || '');

    useEffect(() => {
        if (newsData?.data) {
            setNewsList(prev => (page === 1 ? newsData.data : [...prev, ...newsData.data]));
        }
    }, [newsData]);

    useEffect(() => {
        setPage(1);
    }, [selectedDate]);

    const handleLoadMore = () => {
        if (!isLoading && newsData?.data?.length > 0) {
            setPage(prev => prev + 1);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: theme.background,
        },
        sectionTitle: {
            fontSize: 24,
            fontWeight: '700',
            marginBottom: 16,
            textAlign: 'center',
            color: theme.text,
        },
        calendarToggleButton: {
            backgroundColor: theme.newsbg || '#eee',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 12,
            elevation: 2,
            width: 200
        },
        calendarToggleText: {
            color: theme.text,
            fontWeight: '600',
            fontSize: 16,
            marginLeft: 8,
        },
        calendarIcon: {
            fontSize: 18,
            color: theme.text,
        },
        calendarContainer: {
            backgroundColor: theme.newsbg,
            padding: 12,
            borderRadius: 12,
            marginBottom: 20,
            elevation: 5,
        },
        infoText: {
            fontSize: 15,
            color: theme.text,
            textAlign: 'center',
            marginVertical: 12,
        },
        newsList: {
            paddingBottom: 30,
        },
        newsCard: {
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: 20,
            backgroundColor: theme.newsbg,
            borderWidth: 1,
            borderColor: scheme === 'dark' ? '#444' : '#ccc',
            elevation: 3,
        },
        newsTextContainer: {
            padding: 14,
            backgroundColor: theme.newsbg,
        }
        ,
        newsImage: {
            width: '100%',
            height: 200,
        },

        newsTitle: {
            fontSize: 18,
            fontWeight: '800',
            color: theme.text,
            marginBottom: 6,
            fontFamily: 'serif',
        },
        newsDescription: {
            fontSize: 15,
            color: theme.text,
            fontFamily: 'Georgia',
            marginBottom: 4,
            lineHeight: 22,
        },
        newsSource: {
            fontSize: 13,
            color: '#666',
            fontStyle: 'italic',
        },

        newsDate: {
            fontSize: 13,
            color: theme.text,
            marginTop: 2,
        },
        linkButton: {
            borderWidth: 1,
            borderColor: theme.text,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 6,
            marginTop: 8,
            alignItems: 'center',
            backgroundColor: 'transparent',
        },

        selectedDateBox: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.background,
            padding: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.text,
            marginBottom: 10,
        },

        selectedDateText: {
            color: theme.text,
            fontSize: 16,
            fontWeight: '600',
            marginLeft: 8,
        },
        calendarIconModern: {
            fontSize: 18,
            color: theme.text,
        },

    });


    const renderNewsItem = ({ item }: any) => (
        <View style={[styles.newsCard, { backgroundColor: theme.background }]}>
            {item.image ? (
                <Image source={{ uri: item.image }} style={styles.newsImage} />
            ) : (
                <View style={[styles.newsImage, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
                    <Text>No image</Text>
                </View>
            )}
            <View style={styles.newsTextContainer}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsDescription}>{item.description}</Text>
                <Text style={styles.newsSource}>{item.source}</Text>
                <Text style={styles.newsDate}>{item.publishDate}</Text>
                <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL(item.url)}>
                    <Text style={styles.newsDate}>HABERE GİT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>News by Date</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                {selectedDate && (
                    <View style={[styles.selectedDateBox, { flexDirection: 'row', marginBottom: 0 }]}>
                        <FontAwesome name="calendar" style={styles.calendarIconModern} />
                        <Text style={styles.selectedDateText}>{selectedDate}</Text>
                    </View>
                )}

                <TouchableOpacity style={[styles.selectedDateBox, { marginBottom: 0 }]} onPress={() => setShowCalendar(!showCalendar)}>
                    <Text style={styles.selectedDateText}>
                        {showCalendar ? 'Close' : 'Date'}
                    </Text>
                </TouchableOpacity>
            </View>


            {showCalendar && (
                <View style={styles.calendarContainer}>
                    <Calendar
                        onDayPress={(day: any) => {
                            setSelectedDate(day.dateString);
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

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={{
                    backgroundColor: theme.newsbg,
                    borderColor: 'transparent',
                    height: 40,
                    borderRadius: 10,
                    marginBottom: 10,


                }}
                dropDownContainerStyle={{
                    backgroundColor: theme.newsbg,
                }}
                textStyle={{
                    color: theme.text,
                }}
            />




            {isLoading && page === 1 && (
                <ActivityIndicator size="large" color={theme.text} style={{ marginTop: 20 }} />
            )}

            {error && (
                <Text style={styles.infoText}>Haberler yüklenemedi. Tarih Seçin.</Text>
            )}

            {!error && selectedDate && (
                filteredNews.length > 0 ? (
                    <FlatList
                        style={{ paddingTop: 10, marginTop: 10 }}
                        data={filteredNews}
                        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                        renderItem={renderNewsItem}
                        contentContainerStyle={styles.newsList}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.7}
                        ListFooterComponent={isLoading && page > 1 ? (
                            <ActivityIndicator size="small" color={theme.text} />
                        ) : null}
                    />
                ) : (
                    <Text style={styles.infoText}>Bu tarihte haber bulunamadı.</Text>
                )
            )}
        </View>
    );
};

export default DateNewsPage;
