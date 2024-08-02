import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { onAuthStateChanged, User } from 'firebase/auth';
import { AuthProvider } from '@/hooks/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { auth } from './firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import ModalHeaderText from '@/components/ModalHeaderText';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // FagoPro: require('../assets/fonts/fagopro.otf'),
    // FagoProBold: require('../assets/fonts/fagopro-bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(post)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)/search"
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
              headerTransparent: true,
              headerTitle: "",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={{
                    backgroundColor: '#fff',
                    borderColor: Colors.grey,
                    borderRadius: 20,
                    borderWidth: 1,
                    padding: 4,
                  }}>
                  <Ionicons name="close-outline" size={22} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}