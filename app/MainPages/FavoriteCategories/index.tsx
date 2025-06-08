import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    useColorScheme,
    ActivityIndicator,
    TouchableOpacity,
    Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '../../styles';
import { router, useNavigation } from 'expo-router';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFavorites } from '@/hooks/useAllNews';


const categories = [
    {
        name: 'SPORT',
        image:
            'https://st5.depositphotos.com/10894906/75286/i/450/depositphotos_752867598-stock-photo-set-sport-equipment-rackets-tennis.jpg',
    },
    {
        name: 'Finance',
        image:
            'https://st3.depositphotos.com/3703765/31743/i/450/depositphotos_317431894-stock-photo-financial-stock-market-graph-and.jpg',
    },
    {
        name: 'Technology',
        image:
            'https://www.alastyr.com/blog/wp-content/uploads/2020/08/gelecegin-teknolojileri.jpg.webp',
    },
];

const FavoriteCategories = () => {
    const CATEGORY_KEY = 'SELECTED_CATEGORIES0';
    const navigation = useNavigation();
    const scheme = useColorScheme();
    const theme = scheme === 'dark' ? darkTheme : lightTheme;

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Kategorileri AsyncStorage'dan yükle
    const loadCategoriesFromStorage = async () => {
        try {

            const stored = await AsyncStorage.getItem(CATEGORY_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setSelectedCategories(parsed);
            }
        } catch (error) {
            console.error('Kategoriler yüklenirken hata:', error);
        }
    };

    // Kategorileri AsyncStorage'a kaydet
    const saveCategoriesToStorage = async (categories: string[]) => {
        try {

            await AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
        } catch (error) {
            console.error('Kategoriler kaydedilirken hata:', error);
        }
    };


    useEffect(() => {
        navigation.setOptions({ headerShown: false });
        loadCategoriesFromStorage();

    }, []);

    // useFavorites hook'unu kullanarak favori kategorilere göre haberleri alıyoruz
    const { data: newsData, isLoading, isError }: any = useFavorites(selectedCategories);

    // Kategori seçimini güncelle
    const toggleCategory = (category: string) => {
        const updated = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];
        setSelectedCategories(updated); // sadece state güncellenir
    };
    useEffect(() => {
        saveCategoriesToStorage(selectedCategories);
    }, [selectedCategories]);


    // Stil objesi
    const styles = StyleSheet.create({
        container: { flex: 1, padding: 20, paddingTop: 80, backgroundColor: theme.background },
        categoryTitleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        sectionTitle: { fontSize: 22, fontWeight: 'bold' },
        categoryList: { marginVertical: 16 },
        categoryCard: {
            padding: 8,
            marginRight: 12,
            borderRadius: 12,
            width: 100,
            alignItems: 'center',
            elevation: 2,
            borderWidth: 2,
            paddingBottom: 20,
            marginBottom: 45,
        },
        categoryImage: {
            width: 60,
            height: 60,
            borderRadius: 30,
            marginBottom: 6,
        },
        categoryText: {
            fontSize: 14,
            fontWeight: '600',
            textAlign: 'center',
        },
        newsList: { paddingBottom: 30 },
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
        },
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
        },
    });

    const renderCategoryItem = ({ item }: any) => {
        const isSelected = selectedCategories.includes(item.name);
        return (
            <TouchableOpacity onPress={() => toggleCategory(item.name)}>
                <View
                    style={[
                        styles.categoryCard,
                        {
                            backgroundColor: isSelected ? theme.buttonBackground : theme.background,
                            borderColor: isSelected ? theme.background : '#ccc',
                        },
                    ]}
                >
                    <Image source={{ uri: item.image }} style={styles.categoryImage} />
                    <Text style={[styles.categoryText, { color: theme.text }]}>{item.name}</Text>
                    {isSelected && <MaterialIcons name="check-circle" size={18} color={theme.background} />}
                </View>
            </TouchableOpacity>
        );
    };

    const renderNewsItem = ({ item }: any) => (
        <View style={styles.newsCard}>
            {item.image ? (
                <Image source={{ uri: item.image }} style={styles.newsImage} />
            ) : (
                <View
                    style={[
                        styles.newsImage,
                        { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
                    ]}
                >
                    <Text>No image</Text>
                </View>
            )}
            <View style={styles.newsTextContainer}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsDescription}>{item.description}</Text>
                <Text style={styles.newsSource}>{item.source}</Text>
                <Text style={styles.newsDate}>{item.publishDate}</Text>

                <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL(item.url)}>
                    <Text style={[styles.newsDate, { fontWeight: '600' }]}>📰 Haberi Oku</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    if (newsData) {
        if (isLoading && (!newsData || newsData.data?.length === 0)) {
            return (
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
    }

    if (isError) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.text }}>Bir hata oluştu. Tekrar deneyin.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.categoryTitleContainer}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Favori Kategoriler</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="backward" size={20} color={theme.buttonBackground} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
            />

            <Text style={[styles.sectionTitle, { color: theme.text }]}>Haberler</Text>

            <FlatList
                data={newsData?.news}
                renderItem={renderNewsItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.newsList}

                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

export default FavoriteCategories;
