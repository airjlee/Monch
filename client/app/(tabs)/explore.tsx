import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, FlatList, Text, View, ActivityIndicator } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


// Define the restaurant type
interface Restaurant {
  id: number;
  name: string;
}

export default function TabTwoScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRestaurants();
  }, []);

  // dummy for now
  const fetchRestaurants = async (): Promise<Restaurant[]> => {
    return [
      { id: 1, name: 'Restaurant A' },
      { id: 2, name: 'Restaurant B' },
    ];
  };

  // fetch the restaurants
  const loadRestaurants = async () => {
    try {
      setLoading(true);
      const data = await fetchRestaurants();
      setRestaurants(data);
      setError(null);
    } catch (err) {
      setError('Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore Page</ThemedText>
      </ThemedView>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.restaurantItem}>
              <ThemedText>{item.name}</ThemedText>
            </View>
          )}
        />
      )}
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
  restaurantItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
