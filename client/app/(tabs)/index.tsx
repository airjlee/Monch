import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Image, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Post } from '@/components/Post';
import { SearchBar } from '@/components/SearchBar';
import { Link } from 'expo-router';
import ImageCarousel from '@/components/imageCarousel';

// dummy post array to intitially represent posts
// we will write a fetch from server to get actual posts
const posts: Post[] = [
  {
    id: '1',
    username: 'airjlee',
    rating: "",
    restaurantName: "",
    images: [
      'https://via.placeholder.com/350x150',
      require('../../assets/images/danielpfp.jpg'),
      'https://via.placeholder.com/350x150'],
    caption: 'fire food',

  },
  {
    id: '2',
    username: 'hemkeshb',
    rating: "",
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
    rating: "",
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
    rating: "",
    restaurantName: "",
    images: [
      'https://via.placeholder.com/350x150',
      'https://via.placeholder.com/350x150',
      'https://via.placeholder.com/350x150'],
    caption: 'yummy',
  },
];


const PostItem: React.FC<Post> = ({ username, images, caption, rating, restaurantName }) => (
  // implement this ?
//     // <Link href={``} asChild>
      
//     // </Link>
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <ThemedText style={styles.username}>{username}</ThemedText>
          <ThemedText style={styles.restaurantName}>{restaurantName}</ThemedText>
        </View>
      </View>
      <ImageCarousel images={images} />
      <View style={styles.postContent}>
        <ThemedText style={styles.rating}>Rating: {rating}</ThemedText>
        <ThemedText style={styles.postText}>{caption}</ThemedText>
      </View>
    </View>
);

export default function HomeScreen(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Implement search logic here
  };

  return (
    
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <SearchBar value={searchQuery} onChangeText={handleSearch} />
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostItem
              id={item.id}
              username={item.username}
              images={item.images}
              caption={item.caption}
              rating={item.rating}
              restaurantName={item.restaurantName}
            />
          )}
          contentContainerStyle={styles.postsContainer}
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
  post: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',

  },
  postImage: {
    width: '100%',
    height: 350,
  },
  postContent: {
    padding: 10,
  },
  postText: {
    fontSize: 16,
  },
  headerText: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});