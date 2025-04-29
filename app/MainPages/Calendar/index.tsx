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
        container: { flex: 1, padding: 20, backgroundColor: theme.background },
        sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
        calendarIcon: { alignSelf: 'center', marginVertical: 10 },
        calendarContainer: {
            backgroundColor: theme.background,
            padding: 10,
            borderRadius: 12,
            elevation: 5,
            zIndex: 100,
            marginBottom: 20,
        },
        infoText: { fontSize: 16, color: theme.text, textAlign: 'center', marginBottom: 10 },
        newsList: { paddingBottom: 30 },
        newsCard: {
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: 20,
            backgroundColor: theme.newsbg,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
        },
        newsImage: {
            width: '100%',
            height: 180,
        },
        newsTextContainer: {
            padding: 10,
            backgroundColor: theme.newsbg,
        },
        newsTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 4,
        },
        newsDescription: {
            fontSize: 14,
            color: theme.text,
            marginBottom: 4,
        },
        newsSource: {
            fontSize: 12,
            color: theme.text,
        },
        newsDate: {
            fontSize: 12,
            color: theme.text,
            marginBottom: 4,
        },
        linkButton: {
            backgroundColor: theme.buttonBackground || '#eee',
            padding: 8,
            borderRadius: 6,
            marginTop: 6,
        },
        calendarToggleButton: {
            backgroundColor: theme.buttonBackground || '#ccc',
            padding: 10,
            alignItems: 'center',
            borderRadius: 10,
            marginBottom: 15,
        },
        calendarToggleText: {
            color: theme.text,
            fontWeight: '600',
        },
    });

    const renderNewsItem = ({ item }: any) => (
        <View style={[styles.newsCard, { backgroundColor: theme.background }]}>
            {item.image ? (
                <Image source={{ uri: item.image }} style={styles.newsImage} />
            ) : (
                <View style={[styles.newsImage, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
                    <Text>Resim Yok</Text>
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
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Tarihe Göre Haberler</Text>

            <TouchableOpacity style={styles.calendarToggleButton} onPress={() => setShowCalendar(!showCalendar)}>
                <Text style={styles.calendarToggleText}>
                    {showCalendar ? 'Takvimi Kapat' : 'Takvimi Aç'}
                </Text>
            </TouchableOpacity>

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

            {selectedDate && (
                <Text style={styles.infoText}>Seçilen Tarih: {selectedDate}</Text>
            )}

            {isLoading && page === 1 && (
                <ActivityIndicator size="large" color={theme.text} style={{ marginTop: 20 }} />
            )}

            {error && (
                <Text style={styles.infoText}>Haberler yüklenemedi. Tarih Seçin.</Text>
            )}

            {!error && selectedDate && (
                filteredNews.length > 0 ? (
                    <FlatList
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
