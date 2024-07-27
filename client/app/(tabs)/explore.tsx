import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TouchableOpacity} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.titleContainer}>
        <Link href="/profile" asChild>
          <TouchableOpacity>
            <ThemedText type="title">Explore Page</ThemedText>
          </TouchableOpacity>
        </Link>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});
