import { updateCurrentPage } from "@/lib/components/CurrentPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Animated, Text, View, Dimensions, Pressable, StyleSheet } from "react-native";



const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Index() {
  const router = useRouter();
  const navigation = useNavigation()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currenPage, setCurrentPage] = useState<string>('')


  useEffect(() => {
    updateCurrentPage(currenPage);  // Fonksiyonu çağırın
  }, [currenPage]);
  useEffect(() => {
    const getSavedPage = async () => {
      const savedPage = await AsyncStorage.getItem('currentPage');
      if (savedPage) {
        setCurrentPage(savedPage);
        router.push(`${savedPage}` as any);
        console.log(savedPage, 'Kayıtlı sayfan')
      }
      if (localStorage.getItem('girildi') == 'girildi') {
        router.push('/MainPages')
      }
    };

    getSavedPage();
  }, [router]); // useEffect içerisinde router'ı bağımlılık olarak ekleyin


  const messages = [
    "Almanak APP'e hoşgeldiniz",
    "Sizin için haberleri getiriyoruz.",
    "En unutulmazlar",
    "Hatırlamak istedikleriniz",
  ];

  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  useLayoutEffect(() => {
    // Başlık gizlendi
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handlePress = () => {
    // Fade-out animasyonu başlatılıyor
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Mesajı değiştir
      const nextIndex = (currentIndex + 1) % messages.length;
      setCurrentIndex(nextIndex);

      // Pozisyonu sıfırla ve mesajı yeniden göster
      translateX.setValue(SCREEN_WIDTH);
      opacity.setValue(1);

      // Kaydırma animasyonunu başlat
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Son mesaja geldiğinde yönlendir
      if (currentIndex === messages.length - 1) {
        router.push('/MainPages');

      }
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: opacity,
            transform: [{ translateX }],
          },
        ]}
      >
        <Text style={styles.messageText}>{messages[currentIndex]}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "linear-gradient(to bottom,rgb(0, 0, 0),rgb(162, 72, 3))", // Degrade arka plan
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  messageText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.4)", // Gölgeleme efekti
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
});
