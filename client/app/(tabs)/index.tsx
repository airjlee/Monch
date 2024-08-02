import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Image, TextInput, SafeAreaView, TouchableOpacity, Touchable, TouchableOpacityBase } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import PostPage, { Post } from '@/components/Post';
import { SearchBar } from '@/components/SearchBar';
import PostModal from '@/components/individualPost'

// dummy post array to intitially represent posts
// we will write a fetch from server to get actual posts
const posts: Post[] = [
  {
    id: '1',
    username: 'airjlee',
    rating: 0.0,
    restaurantName: "isarn",
    images: [
      'https://via.placeholder.com/350x150',
      'https://via.placeholder.com/350x150',
      'https://via.placeholder.com/350x150'],
    caption: 'fire food',

  },
  {
    id: '2',
    username: 'hemkeshb',
    rating: 0.0,
    restaurantName: "",
    images: [
      'https://via.placeholder.com/350x150',
      'https://via.placeholder.com/350x150',
      'https://via.placeholder.com/350x150'],
    caption: 'this was gasssss',
  },
  {
    id: '3',
    username: 'alexshuozeng',
    rating: 0.0,
    restaurantName: "",
    images: [
      'https://via.placeholder.com/350x150',
      'https://via.placeholder.com/350x150',
      'https://via.placeholder.com/350x150'],
    caption: 'ts hitttt',
  },
  {
    id: '4',
    username: 'ledaniel',
    rating: 0.0,
    restaurantName: "",
    images: [
      'https://via.placeholder.com/350x150',
      'https://via.placeholder.com/350x150',
      'https://via.placeholder.com/350x150'],
    caption: 'yummy',
  },
];

export default function HomeScreen(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);
  const [postsArray, setPostsArray] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handlePostsRetrieve();
  }, []);
  
  const handlePostsRetrieve = async () => {
    try{
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if(!response.ok){
        throw new Error("not ok");
      }
      const data = await response.json();
      console.log("POST SUCCESS", data);
      setPostsArray(data);
      setError(null);
    } catch (error) {
      console.error("error: ", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Implement search logic here
  };

  const handleImagePress = (postIndex: number, imageIndex: number) => {
    setSelectedPostIndex(postIndex);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <SearchBar value={searchQuery} onChangeText={handleSearch} />
        {isLoading ? (
        <ThemedText>Loading...</ThemedText>
      ) : error ? (
        <ThemedText>Error: {error}</ThemedText>
      ) : (
        <FlatList
          // data={posts}
          data={postsArray}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <PostPage
              {...item}
              onImagePress={(imageIndex) => handleImagePress(index, imageIndex)}
            />
          )}
          contentContainerStyle={styles.postsContainer}
        />
      )}
        <PostModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          // post={posts[selectedPostIndex]}
          post={postsArray[selectedPostIndex]}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postsContainer: {
    padding: 16,
  },
});