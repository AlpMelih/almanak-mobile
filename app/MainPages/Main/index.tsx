import { View, Text, FlatList, Image, StyleSheet, useColorScheme, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '../../styles';
import { useNavigation } from 'expo-router';
import Bottombar from '../../../lib/components/tabbar/Bottombar';
import { useNews, useFinanceNews, useSportsNews } from '@/hooks/useAllNews';

const categories = [
    { name: 'TÜM', image: 'https://cdn-icons-png.flaticon.com/512/1021/1021262.png' },
    { name: 'SPORT', image: 'https://st5.depositphotos.com/10894906/75286/i/450/depositphotos_752867598-stock-photo-set-sport-equipment-rackets-tennis.jpg' },
    { name: 'FİNANCE', image: 'https://st3.depositphotos.com/3703765/31743/i/450/depositphotos_317431894-stock-photo-financial-stock-market-graph-and.jpg' },
];

const MainPage = () => {
    const navigation = useNavigation();
    const scheme = useColorScheme();
    const theme = scheme === 'dark' ? darkTheme : lightTheme;

    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('TÜM');
    const [allNews, setAllNews] = useState<any[]>([]);

    const {
        data: newsData,
        isLoading,
        isError,
    } = selectedCategory === 'FİNANCE'
            ? useFinanceNews(page)
            : selectedCategory === 'SPORT'
                ? useSportsNews(page)
                : useNews(page);

    const styles = StyleSheet.create({
        container: { flex: 1, padding: 20, backgroundColor: theme.background },
        sectionTitle: { fontSize: 22, fontWeight: 'bold' },
        categoryList: { marginBottom: 60 },
        categoryCard: { padding: 10, margin: 5, borderRadius: 10, width: 120 },
        categoryImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
        categoryText: { fontSize: 16, fontWeight: '600' },
        newsList: { paddingBottom: 30 },
        newsCard: { flexDirection: 'row', borderRadius: 10, marginBottom: 20, padding: 10 },
        newsImage: { width: 100, height: 100, borderRadius: 10, marginRight: 10 },
        newsTextContainer: { flex: 1, justifyContent: 'center' },
        newsTitle: { fontSize: 18, fontWeight: 'bold' },
        newsDescription: { fontSize: 14, marginVertical: 5 },
        newsSource: { fontSize: 12 },
        newsDate: { fontSize: 12 },
        linkButton: { backgroundColor: theme.buttonBackground, padding: 10 },
    });

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    useEffect(() => {
        if (newsData?.data) {
            setAllNews((prev) => page === 1 ? newsData.data : [...prev, ...newsData.data]);
        }
    }, [newsData]);

    const handleCategoryPress = (category: string) => {
        setSelectedCategory(category);
        setPage(1);
        setAllNews([]);
    };

    const renderCategoryItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => handleCategoryPress(item.name)}>
            <View style={[styles.categoryCard, { backgroundColor: theme.background }]}>
                <Image source={{ uri: item.image }} style={styles.categoryImage} />
                <Text style={[styles.categoryText, { color: theme.text }]}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderNewsItem = ({ item }: any) => (
        <View style={[styles.newsCard, { backgroundColor: theme.background }]}>
            <Image source={{ uri: item.image }} style={styles.newsImage} />
            <View style={styles.newsTextContainer}>
                <Text style={[styles.newsTitle, { color: theme.text }]}>{item.title}</Text>
                <Text style={[styles.newsDescription, { color: theme.text }]}>{item.description}</Text>
                <Text style={[styles.newsSource, { color: theme.text }]}>{item.source}</Text>
                <Text style={[styles.newsDate, { color: theme.text }]}>{item.publishDate}</Text>
                <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL(item.url)}>
                    <Text style={[styles.newsDate, { color: theme.text }]}>HABERE GİT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const loadMoreData = () => {
        if (!isLoading && !isError && newsData?.data?.length > 0) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    if (isLoading && allNews.length === 0) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (isError) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.text }}>Bir hata oluştu. Tekrar deneyin.</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Kategoriler</Text>

            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
            />

            <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {selectedCategory} Haberleri
            </Text>

            <FlatList
                data={allNews}
                renderItem={renderNewsItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.newsList}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

export default MainPage;
