import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    View,
    Image,
    useColorScheme,
    FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';

import { darkTheme, lightTheme } from '@/app/styles';
import { useNewsWithHook } from '@/hooks/useAllNews';

const SearchPage = () => {
    const scheme = useColorScheme();
    const theme = scheme === 'dark' ? darkTheme : lightTheme;

    const [searchInput, setSearchInput] = useState<string>('');

    const [searchInput1, setSearchInput1] = useState<string>('');
    const [newsList, setNewsList] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const { data, isLoading, isError } = useNewsWithHook(searchInput1);

    useEffect(() => {
        if (data) {
            setNewsList(data);
            console.log(data);
        }
    }, [data]);

    const handleSearch = () => {
        if (searchInput) {
            setIsSearching(true);
        } else {
            setNewsList([]);
        }
        setSearchInput1(searchInput)
    };

    const styles = StyleSheet.create({
        container: { flex: 1, padding: 20, backgroundColor: theme.background },
        searchContainer: { flexDirection: 'row', marginBottom: 20 },
        searchInput: {
            flex: 1,
            borderWidth: 1,
            padding: 10,
            borderRadius: 6,
            backgroundColor: theme.text,
        },
        searchButton: {
            marginLeft: 10,
            padding: 10,
            backgroundColor: theme.text || '#ccc',
            borderRadius: 6,
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

    });

    const renderNewsItem = ({ item }: { item: any }) => (
        <View style={styles.newsCard}>
            {item?.image ? (
                <Image source={{ uri: item.image }} style={styles.newsImage} />
            ) : (
                <View
                    style={[
                        styles.newsImage,
                        { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
                    ]}
                >
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
            <View style={styles.searchContainer}>
                <TextInput
                    style={[styles.searchInput, { color: theme.background }]}
                    value={searchInput}
                    onChangeText={setSearchInput}
                    placeholder="Search news..."
                    placeholderTextColor={theme.background || '#888'} // varsa kullan
                />

                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={{ color: theme.background }}>Search</Text>
                </TouchableOpacity>
            </View>

            {isSearching && isLoading && <Text>Loading...</Text>}
            {isError && <Text>There was an error fetching the news.</Text>}

            {!isLoading && newsList.length === 0 ? (
                <Text>No news found</Text>
            ) : (
                <FlatList
                    data={newsList}
                    renderItem={renderNewsItem}
                    keyExtractor={(item) => item._id}
                />
            )}
        </View>
    );
};

export default SearchPage;
